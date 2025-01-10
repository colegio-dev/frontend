# Aplicación Web para Gestión de Estudiantes

## Resumen

Esta aplicación web proporciona un sistema para gestionar registros de estudiantes, pagos y cuentas de usuarios. Ofrece funcionalidades para registrar nuevos estudiantes, visualizar su información y administrar pagos mensuales. La aplicación también incluye control de acceso basado en roles, permitiendo que diferentes tipos de usuarios realicen acciones específicas.

---

## Características

### 1. **Gestión de Estudiantes**

- **Registrar Estudiantes**: Crear nuevos perfiles de estudiantes con información personal y de facturación.
- **Visualizar Lista de Estudiantes**: Mostrar una lista de todos los estudiantes registrados con detalles clave.
- **Buscar y Filtrar**: Buscar estudiantes por nombre o filtrar por atributos específicos (por ejemplo, pagos pendientes).

### 2. **Seguimiento de Pagos**

- **Registro de Pagos Mensuales**: Registrar pagos realizados por cada estudiante.
- **Historial de Pagos**: Visualizar un registro de todos los pagos realizados por un estudiante.
- **Saldos Pendientes**: Calcular y mostrar automáticamente los montos pendientes en base a los pagos registrados.

### 3. **Gestión de Usuarios**

- **Control de Acceso Basado en Roles**:
  - **Administrador**: Puede crear, editar y eliminar cuentas de usuario, así como gestionar todos los registros de estudiantes y pagos.
  - **Usuario Estándar**: Puede visualizar listas de estudiantes y registrar pagos, pero no puede crear ni eliminar usuarios.
- **Creación y Eliminación de Usuarios**: Los administradores pueden añadir nuevos usuarios o eliminar los existentes.

---

## Tecnologías Utilizadas

### **Frontend**

- HTML5, CSS3, React.js.

### **Backend**

- Node.js con Express.js.

### **Base de Datos**

- MySQL para almacenamiento estructurado de datos.

### **Autenticación**

- Autenticación basada en sesiones.

### **Hosting**

- Frontend desplegado en Firebase.
- Backend desplegado en Render.
- Base de datos en Clever Cloud.

---

## Instalación y Configuración

### Prerrequisitos

- Node.js instalado en tu sistema.
- Base de datos MySQL configurada.

### Pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-repo.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd directorio-proyecto
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura la base de datos:
   - Actualiza el archivo `.env` con las credenciales de tu base de datos.
5. Ejecuta las migraciones de la base de datos:
   ```bash
   npm run migrate
   ```
6. Inicia la aplicación:
   ```bash
   npm start
   ```
7. Accede a la aplicación en tu navegador en `http://localhost:3000`.

---

## Endpoints de la API

### **Autenticación**

- `POST /login` - Autenticar un usuario y obtener un token.

### **Estudiantes**

- `GET /students` - Obtener una lista de todos los estudiantes.
- `POST /students` - Añadir un nuevo estudiante (solo Admin).
- `PUT /students/:id` - Actualizar la información de un estudiante.
- `DELETE /students/:id` - Eliminar un estudiante (solo Admin).

### **Pagos**

- `POST /payments` - Registrar un nuevo pago para un estudiante.
- `GET /students/:id/payments` - Ver el historial de pagos de un estudiante específico.

### **Usuarios**

- `POST /users` - Crear un nuevo usuario (solo Admin).
- `DELETE /users/:id` - Eliminar un usuario (solo Admin).

---

## Uso

### Usuarios Administradores

1. Inicia sesión con credenciales de administrador.
2. Accede al panel de administración para:
   - Crear, actualizar o eliminar registros de estudiantes.
   - Visualizar el historial de pagos de todos los estudiantes.
   - Gestionar cuentas de usuarios.

### Usuarios Estándar

1. Inicia sesión con credenciales de usuario estándar.
2. Accede al panel para:
   - Visualizar la lista de estudiantes.
   - Registrar pagos para los estudiantes.

---

## Seguridad

- El control de acceso basado en roles asegura que solo los usuarios autorizados puedan realizar acciones sensibles.
- Contraseñas encriptadas almacenadas en la base de datos.
- Todos los endpoints sensibles están protegidos con middleware de autenticación.

---

## Mejoras Futuras

- Agregar soporte para generar informes de pagos.
- Implementar un sistema de notificación para recordar a los estudiantes sobre pagos pendientes.
- Soportar múltiples métodos de pago (por ejemplo, tarjetas de crédito, PayPal).
- Permitir la exportación de datos de estudiantes y pagos a Excel o PDF.

---

## Contribución

¡Aceptamos contribuciones! Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección de errores.
3. Envía un pull request con una descripción detallada de tus cambios.

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

