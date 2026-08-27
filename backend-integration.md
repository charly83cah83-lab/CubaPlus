# CubaPlus — integración CuboPay

## Arquitectura
Frontend (Vite/React) → Backend seguro → CuboPay API.
La API Key de producción NO debe estar en React ni en el navegador.

## Variables de entorno
CUBO_API_URL=
CUBO_API_KEY=
APP_URL=
DATABASE_URL=

## Crear suscripción
POST /api/membership/create
1. Crear/validar usuario.
2. Crear registro de membresía `PENDING`.
3. Llamar a CuboPay `/api/v1/links/subscription`.
4. Usar `amount` en centavos.
5. Enviar `metadata: { membershipId, userId, plan }`.
6. Devolver `cuboRedirectUri` al frontend.

## Webhook
POST /api/webhooks/cubo
- Verificar que la solicitud provenga de la configuración esperada de Cubo.
- Leer `identifier`, `status`, `referenceId`, `amount`, `paymentType`, `metadata`.
- Si `status === "SUCCEEDED"`:
  - localizar membershipId desde metadata;
  - activar membresía;
  - guardar referenceId/identifier;
  - registrar evento de forma idempotente.
- Si `REJECTED`, dejar el registro como rechazado y no activar acceso.
- Responder 2xx rápidamente.

## Seguridad
- No almacenar números completos de tarjeta.
- Nunca enviar API Key al cliente.
- Validar precios en servidor; nunca confiar en el precio enviado por el navegador.
- Implementar rate limiting, sesiones seguras, CSRF donde corresponda y logs sin datos sensibles.
- Añadir términos, privacidad, cancelación y política de reembolsos antes de producción.

## Producción
La activación de pagos reales depende de CuboPay. Primero se prueba en SANDBOX y luego se solicita el paso a producción.
