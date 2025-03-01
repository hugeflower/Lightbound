export const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
        const exp:number = payload.exp * 1000;
        return Date.now() > exp; // Vérifier si le token est expiré
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.error("Erreur d'authentification");
        // l'utilisateur ne saura pas s'il y a un problème avec son token
        return true;
    }
};

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt');
    return !!token && !isTokenExpired(token); // Vérifier la présence et la validité du token
};

export const hasRole = (role: string): boolean => {
    const token = localStorage.getItem('jwt');
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
        const roles = payload.roles as string[]; // Extraire les rôles
        console.log(roles);
        return roles.includes(role); // Vérifier si le rôle est présent
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.error("Erreur d'authentification");
        // l'utilisateur ne saura pas s'il y a un problème avec son token
        return true;
    }
};