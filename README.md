# MEAN Stack Login con autentificacion jwt, y operaciones crud
Proyecto realizado con servidor nodejs, usando autentificacion jsonwebtoken, y empleando operacioens crud, con interfaz frontend de angular

# Contenido
-Servidor desarrollado en nodejs v4.17.10
-Framework express v4.16.3
-Encriptacion bcryptjs v2.4.3 de contraseña, al registrar el usuario, y el salt secret
-Verificacion usando passport v0.4.0, passport-local v1.0.0
-Generacion de token, usando la libreria jsonwebtoken v8.3.0, para autentificar la session, con limite de tiempo
-Validacion de token, usando express, y bodyparser v1.18.3
-Conexion a base de datos, empelando no-sql mongodb, con conexion por medio de mongoose v5.1.2
-Lectura y operaciones de archivos json, usando lodash v4.17.10
-Operaciones CRUD
-Aplicacion cliente bajo angular 7
-Verificacion de login, usando auth.guard.ts, y auth.interceptor.ts
-Desarrollo de interfaz, mediante materialize
-Implementacion de modales, pasando variables a este, para operaciones

# Desarrollado por Rodolfo Javier Roa Briceño