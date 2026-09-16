export async function apiPool(formData: any,) {
     const token = "8944593745:AAHNRSJLCZl8wVJsoI833npl6MgMDFbcmko"
     const url = `https://api.telegram.org/bot${token}/getUpdates`
     try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (e: any) {
        return e.message || e;
    }
}