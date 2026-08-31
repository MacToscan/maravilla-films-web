const RECIPIENT = 'producciones@maravillafilms.com';
const SENDER = 'noreply@maravillafilms.com';

const redirectToContact = (request, result) => {
	const url = new URL('/contact', request.url);
	url.searchParams.set(result, '1');
	return Response.redirect(url.toString(), 303);
};

const cleanSingleLine = (value, maxLength) =>
	String(value ?? '')
		.replace(/[\r\n]+/g, ' ')
		.trim()
		.slice(0, maxLength);

export async function onRequestPost({ request, env }) {
	try {
		const formData = await request.formData();
		const honeypot = cleanSingleLine(formData.get('website_url'), 200);

		// Los bots reciben una respuesta normal para no revelar el filtro antispam.
		if (honeypot) return redirectToContact(request, 'enviado');

		const nombre = cleanSingleLine(formData.get('nombre'), 100);
		const email = cleanSingleLine(formData.get('email'), 254).toLowerCase();
		const mensaje = String(formData.get('mensaje') ?? '').trim().slice(0, 5000);
		const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

		if (!nombre || !validEmail || !mensaje) {
			return new Response('Datos del formulario no válidos.', { status: 400 });
		}

		if (!env.RESEND_API_KEY) {
			throw new Error('Falta el secreto RESEND_API_KEY.');
		}

		const resendResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
				'User-Agent': 'MaravillaFilms-ContactForm/1.0',
			},
			body: JSON.stringify({
				from: `Formulario Web — Maravilla Films <${SENDER}>`,
				to: [RECIPIENT],
				reply_to: `${nombre} <${email}>`,
				subject: `Nuevo mensaje web de ${nombre}`,
				text: [
					'Nuevo mensaje recibido desde maravillafilms.com',
					'',
					`Nombre: ${nombre}`,
					`Correo: ${email}`,
					'',
					'Mensaje:',
					mensaje,
				].join('\n'),
			}),
		});

		if (!resendResponse.ok) {
			const resendError = await resendResponse.text();
			throw new Error(`Resend devolvió ${resendResponse.status}: ${resendError}`);
		}

		return redirectToContact(request, 'enviado');
	} catch (error) {
		console.error('No se pudo enviar el formulario de contacto.', error);
		return redirectToContact(request, 'error');
	}
}
