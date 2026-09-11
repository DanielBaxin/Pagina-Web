/* =========================================
   ELEMENTOS PRINCIPALES
========================================= */

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const recoveryForm =
    document.getElementById("recoveryForm");


const loginBox =
    document.getElementById("loginBox");

const registerBox =
    document.getElementById("registerBox");

const recoveryBox =
    document.getElementById("recoveryBox");


const registro =
    document.getElementById("registro");

const volverLogin =
    document.getElementById("volverLogin");

const olvidePassword =
    document.getElementById("olvidePassword");

const volverLoginRecuperacion =
    document.getElementById(
        "volverLoginRecuperacion"
    );



/* =========================================
   FUNCIONES PARA CAMBIAR DE PANTALLA
========================================= */

function mostrarLogin() {

    loginBox.classList.remove("oculto");

    registerBox.classList.add("oculto");

    recoveryBox.classList.add("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function mostrarRegistro() {

    loginBox.classList.add("oculto");

    recoveryBox.classList.add("oculto");

    registerBox.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function mostrarRecuperacion() {

    loginBox.classList.add("oculto");

    registerBox.classList.add("oculto");

    recoveryBox.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================
   BOTÓN REGÍSTRATE
========================================= */

registro.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        mostrarRegistro();

    }
);



/* =========================================
   VOLVER AL LOGIN DESDE REGISTRO
========================================= */

volverLogin.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        registerForm.reset();

        mostrarLogin();

    }
);



/* =========================================
   OLVIDÉ MI CONTRASEÑA
========================================= */

olvidePassword.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        recoveryForm.reset();

        mostrarRecuperacion();

    }
);



/* =========================================
   VOLVER DESDE RECUPERACIÓN
========================================= */

volverLoginRecuperacion.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        recoveryForm.reset();

        mostrarLogin();

    }
);



/* =========================================
   MOSTRAR / OCULTAR CONTRASEÑA LOGIN
========================================= */

const passwordInput =
    document.getElementById("password");

const mostrarPassword =
    document.getElementById("mostrarPassword");


mostrarPassword.addEventListener(
    "click",
    function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            mostrarPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

            mostrarPassword.setAttribute(
                "aria-label",
                "Ocultar contraseña"
            );

        } else {

            passwordInput.type = "password";

            mostrarPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

            mostrarPassword.setAttribute(
                "aria-label",
                "Mostrar contraseña"
            );

        }

    }
);



/* =========================================
   OBTENER USUARIOS
========================================= */

function obtenerUsuarios() {

    const usuariosGuardados =
        localStorage.getItem("usuarios");

    if (!usuariosGuardados) {

        return [];

    }


    try {

        return JSON.parse(usuariosGuardados);

    } catch (error) {

        console.error(
            "Error al leer los usuarios:",
            error
        );

        return [];

    }

}



/* =========================================
   GUARDAR USUARIOS
========================================= */

function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}



/* =========================================
   REGISTRO DE ESTUDIANTE
========================================= */

registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        /* DATOS */

        const nombre =
            document
                .getElementById("nombre")
                .value
                .trim();

        const apellidoPaterno =
            document
                .getElementById("apellidoPaterno")
                .value
                .trim();

        const apellidoMaterno =
            document
                .getElementById("apellidoMaterno")
                .value
                .trim();

        const curp =
            document
                .getElementById("curp")
                .value
                .trim()
                .toUpperCase();

        const numeroControl =
            document
                .getElementById("numeroControl")
                .value
                .trim();

        const correo =
            document
                .getElementById("correoRegistro")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("passwordRegistro")
                .value;

        const confirmarPassword =
            document
                .getElementById("confirmarPassword")
                .value;



        /* =========================================
           VALIDAR CAMPOS
        ========================================= */

        if (
            nombre === "" ||
            apellidoPaterno === "" ||
            apellidoMaterno === "" ||
            curp === "" ||
            numeroControl === "" ||
            correo === "" ||
            password === "" ||
            confirmarPassword === ""
        ) {

            alert(
                "Por favor, completa todos los campos."
            );

            return;

        }



        /* =========================================
           VALIDAR CURP
        ========================================= */

        if (curp.length !== 18) {

            alert(
                "La CURP debe contener exactamente 18 caracteres."
            );

            return;

        }



        /* =========================================
           VALIDAR CONTRASEÑA
        ========================================= */

        if (password.length < 6) {

            alert(
                "La contraseña debe tener al menos 6 caracteres."
            );

            return;

        }



        /* =========================================
           CONFIRMAR CONTRASEÑA
        ========================================= */

        if (password !== confirmarPassword) {

            alert(
                "Las contraseñas no coinciden."
            );

            return;

        }



        /* =========================================
           OBTENER USUARIOS EXISTENTES
        ========================================= */

        const usuarios =
            obtenerUsuarios();



        /* =========================================
           VALIDAR CORREO DUPLICADO
        ========================================= */

        const correoExiste =
            usuarios.some(
                function(usuario) {

                    return (
                        usuario.correo === correo
                    );

                }
            );


        if (correoExiste) {

            alert(
                "Este correo electrónico ya está registrado."
            );

            return;

        }



        /* =========================================
           VALIDAR NÚMERO DE CONTROL
        ========================================= */

        const numeroControlExiste =
            usuarios.some(
                function(usuario) {

                    return (
                        usuario.numeroControl ===
                        numeroControl
                    );

                }
            );


        if (numeroControlExiste) {

            alert(
                "Este número de control ya está registrado."
            );

            return;

        }



        /* =========================================
           VALIDAR CURP DUPLICADA
        ========================================= */

        const curpExiste =
            usuarios.some(
                function(usuario) {

                    return (
                        usuario.curp === curp
                    );

                }
            );


        if (curpExiste) {

            alert(
                "Esta CURP ya se encuentra registrada."
            );

            return;

        }



        /* =========================================
           CREAR ESTUDIANTE
        ========================================= */

        const nuevoUsuario = {

            id: Date.now(),

            nombre: nombre,

            apellidoPaterno:
                apellidoPaterno,

            apellidoMaterno:
                apellidoMaterno,

            curp: curp,

            numeroControl:
                numeroControl,

            correo: correo,

            password: password,

            rol: "estudiante",

            fechaRegistro:
                new Date().toLocaleString()

        };



        /* =========================================
           GUARDAR
        ========================================= */

        usuarios.push(nuevoUsuario);

        guardarUsuarios(usuarios);



        /* =========================================
           CONFIRMACIÓN
        ========================================= */

        alert(
            "Registro realizado correctamente.\n\n" +
            "Ya puedes iniciar sesión."
        );



        /* =========================================
           LIMPIAR FORMULARIO
        ========================================= */

        registerForm.reset();



        /* =========================================
           REGRESAR AL LOGIN
        ========================================= */

        mostrarLogin();



        /* =========================================
           COLOCAR CORREO AUTOMÁTICAMENTE
        ========================================= */

        document.getElementById("correo").value =
            correo;

        document.getElementById("password").value =
            "";

        document
            .getElementById("password")
            .focus();

    }
);



/* =========================================
   INICIAR SESIÓN
========================================= */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();



        /* =========================================
           OBTENER DATOS
        ========================================= */

        const correo =
            document
                .getElementById("correo")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("password")
                .value;



        /* =========================================
           VALIDAR CAMPOS
        ========================================= */

        if (
            correo === "" ||
            password === ""
        ) {

            alert(
                "Por favor, ingresa tu correo y contraseña."
            );

            return;

        }



        /* =========================================
           OBTENER USUARIOS
        ========================================= */

        const usuarios =
            obtenerUsuarios();



        /* =========================================
           BUSCAR USUARIO POR CORREO
        ========================================= */

        const usuarioEncontrado =
            usuarios.find(
                function(usuario) {

                    return (
                        usuario.correo === correo
                    );

                }
            );



        /* =========================================
           NO ESTÁ REGISTRADO
        ========================================= */

        if (!usuarioEncontrado) {

            alert(
                "No existe una cuenta registrada con este correo.\n\n" +
                "Debes realizar tu registro antes de iniciar sesión."
            );

            return;

        }



        /* =========================================
           CONTRASEÑA INCORRECTA
        ========================================= */

        if (
            usuarioEncontrado.password !==
            password
        ) {

            alert(
                "La contraseña ingresada es incorrecta."
            );

            return;

        }



        /* =========================================
           CREAR SESIÓN
        ========================================= */

        const sesion = {

            id:
                usuarioEncontrado.id,

            nombre:
                usuarioEncontrado.nombre,

            apellidoPaterno:
                usuarioEncontrado.apellidoPaterno,

            apellidoMaterno:
                usuarioEncontrado.apellidoMaterno,

            correo:
                usuarioEncontrado.correo,

            numeroControl:
                usuarioEncontrado.numeroControl,

            curp:
                usuarioEncontrado.curp,

            rol:
                usuarioEncontrado.rol

        };


        localStorage.setItem(
            "sesionActiva",
            JSON.stringify(sesion)
        );



        /* =========================================
           LOGIN CORRECTO
        ========================================= */

        alert(
            "Inicio de sesión correcto.\n\n" +
            "Bienvenido, " +
            usuarioEncontrado.nombre +
            " " +
            usuarioEncontrado.apellidoPaterno +
            "."
        );


        /*
        =========================================
        MÁS ADELANTE:

        Aquí enviaremos al estudiante
        a su panel principal.

        Ejemplo:

        window.location.href =
            "estudiante.html";

        =========================================
        */

    }
);



/* =========================================
   RECUPERAR CONTRASEÑA
========================================= */

recoveryForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();



        /* =========================================
           OBTENER DATOS
        ========================================= */

        const correo =
            document
                .getElementById(
                    "correoRecuperacion"
                )
                .value
                .trim()
                .toLowerCase();


        const nuevaPassword =
            document
                .getElementById(
                    "nuevaPassword"
                )
                .value;


        const confirmarNuevaPassword =
            document
                .getElementById(
                    "confirmarNuevaPassword"
                )
                .value;



        /* =========================================
           VALIDAR CAMPOS
        ========================================= */

        if (
            correo === "" ||
            nuevaPassword === "" ||
            confirmarNuevaPassword === ""
        ) {

            alert(
                "Por favor, completa todos los campos."
            );

            return;

        }



        /* =========================================
           VALIDAR LONGITUD
        ========================================= */

        if (nuevaPassword.length < 6) {

            alert(
                "La contraseña debe tener al menos 6 caracteres."
            );

            return;

        }



        /* =========================================
           CONFIRMAR CONTRASEÑAS
        ========================================= */

        if (
            nuevaPassword !==
            confirmarNuevaPassword
        ) {

            alert(
                "Las contraseñas no coinciden."
            );

            return;

        }



        /* =========================================
           OBTENER USUARIOS
        ========================================= */

        const usuarios =
            obtenerUsuarios();



        /* =========================================
           BUSCAR CUENTA
        ========================================= */

        const indiceUsuario =
            usuarios.findIndex(
                function(usuario) {

                    return (
                        usuario.correo === correo
                    );

                }
            );



        /* =========================================
           CUENTA NO EXISTE
        ========================================= */

        if (indiceUsuario === -1) {

            alert(
                "No existe una cuenta registrada con este correo."
            );

            return;

        }



        /* =========================================
           EVITAR MISMA CONTRASEÑA
        ========================================= */

        if (
            usuarios[indiceUsuario].password ===
            nuevaPassword
        ) {

            alert(
                "La nueva contraseña debe ser diferente a la contraseña anterior."
            );

            return;

        }



        /* =========================================
           ACTUALIZAR CONTRASEÑA
        ========================================= */

        usuarios[indiceUsuario].password =
            nuevaPassword;



        /* =========================================
           GUARDAR CAMBIOS
        ========================================= */

        guardarUsuarios(usuarios);



        /* =========================================
           MENSAJE
        ========================================= */

        alert(
            "Tu contraseña se actualizó correctamente.\n\n" +
            "Ya puedes iniciar sesión con tu nueva contraseña."
        );



        /* =========================================
           LIMPIAR
        ========================================= */

        recoveryForm.reset();



        /* =========================================
           REGRESAR AL LOGIN
        ========================================= */

        mostrarLogin();



        /* =========================================
           COLOCAR CORREO
        ========================================= */

        document.getElementById("correo").value =
            correo;

        document.getElementById("password").value =
            "";

        document
            .getElementById("password")
            .focus();

    }
);