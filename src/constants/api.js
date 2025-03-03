const API_URL = "http://127.0.0.1:5000";

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
};

export const confirmRegistration = async (email, code) => {
    const response = await fetch(`${API_URL}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code })
    });
    return response.json();
};

export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
};

export const forgotPassword = async (email) => {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });
    return response.json();
};

export const resetPassword = async (email, code, newPassword) => {
    try {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code, new_password: newPassword }),
        });

        const data = await response.json();
        console.log("🔹 Reset Password Response:", data);

        return data;
    } catch (error) {
        console.error("Reset Password Error:", error);
        return { error: "Something went wrong!" };
    }
};


export const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/user_data`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        // console.log("User Data Fetched:", data); // ✅ طباعة البيانات هنا

        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};


// Global

export const getTopImporters = async (plant_time, code) => {
    try {
        const response = await fetch(`${API_URL}/top_importers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ plant_time, code }),
        });

        // console.log("🔵 API Response:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("🟢 Parsed Data:", data);
        return data;
    } catch (error) {
        console.error("🔴 API Fetch Error:", error);
        return null;
    }
};


// receive_country

export const sendCountry = async (country) => {
    try {
        const response = await fetch(`${API_URL}/receive_country`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ country }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🟢 Country Sent Successfully:", data);
        return data;
    } catch (error) {
        console.error("🔴 Error Sending Country:", error);
        return null;
    }
};


// recommended_month

export const getRecommendedMonth = async (country) => {
    try {
        const response = await fetch(`${API_URL}/recommended_month`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ country }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("🟢 Recommended Month Data:", data);
        return data;
    } catch (error) {
        console.error("🔴 Error fetching recommended month:", error);
        return null;
    }
};



// country_price

export const getCountryPrice = async (code, country) => {
    try {
        const response = await fetch(`${API_URL}/country_price?code=${code}&country=${country}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("🟢 Country Price Data:", data);
        return data;
    } catch (error) {
        console.error("🔴 Error fetching country price:", error);
        return null;
    }
};

// country_quantity

export const getCountryQuantity = async (code, country) => {
    try {
        const response = await fetch(`${API_URL}/country_quantity?code=${code}&country=${country}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("🟢 Country Quantity Data:", data);
        return data;
    } catch (error) {
        console.error("🔴 Error fetching country quantity:", error);
        return null;
    }
};


// country_growth_value

export const getCountryGrowthValue = async (code, country) => {
    try {
        const response = await fetch(`${API_URL}/country_growth_value?code=${code}&country=${country}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🟢 Country Growth Value Data:", data);
        return data;
    } catch (error) {
        console.error("🔴 Error fetching country growth value:", error);
        return null;
    }
};


// country_growth_quantity

export const getCountryGrowthQuantity = async (code, country) => {
    try {
        const response = await fetch(`${API_URL}/country_growth_quantity?code=${code}&country=${country}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🟢 Country Growth Quantity Data:", data);
        return data;
    } catch (error) {
        console.error("🔴 Error fetching country growth quantity:", error);
        return null;
    }
};
