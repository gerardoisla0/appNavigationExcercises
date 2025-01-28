export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;

    if(!email || email.length <= 0) return 'Email no puede ser vacio.';
    if(!re.test(email)) return 'Ups! necesitamos un correo valido';

    return '';
}

export const passwordValidator = (pwd: string) => {
    if (!pwd || pwd.length <= 0) return 'Contraseña no debe ser vacia';
    return '';
}

export const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return 'Nombre no debe ser vacio';
    return '';
}