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




export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        // console.log("🔹 Login Response:", data);

        if (data.token) {
            localStorage.setItem("authToken", data.token); 
            // console.log("Token After Login:", data.token);
            return { success: true, token: data.token };
        } else {
            return { success: false, error: data.error || "Login failed" };
        }
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};

// 



// export const googleLogin = () => {
//     window.location.href = `${API_URL}/auth/google`;
// };

// export const handleGoogleCallback = async () => {
//     try {
//         const response = await fetch(`${API_URL}/auth/google/callback`, {
//             method: "GET",
//             credentials: "include"
//         });

//         const data = await response.json();
//         if (data.name && data.email) {
//             localStorage.setItem("authToken", data.token);
//             localStorage.setItem("userData", JSON.stringify(data));
//             window.dispatchEvent(new Event("storage"));
//             return { success: true, user: data };
//         } else {
//             return { success: false, error: data.error || "Google login failed" };
//         }
//     } catch (error) {
//         console.error("Google OAuth Error:", error);
//         return { success: false, error: "Error connecting to Google OAuth" };
//     }
// };

export const googleLogin = () => {
    window.location.replace(`${API_URL}/auth/google`);
};

export const handleGoogleCallback = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/google/callback`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();
        if (data.name && data.email) {
            localStorage.setItem("authToken", data.token);  // تأكد من أن التوكن يُخزّن
            localStorage.setItem("userData", JSON.stringify(data));
            window.dispatchEvent(new Event("storage"));
            return { success: true, user: data };
        } else {
            return { success: false, error: data.error || "Google login failed" };
        }
    } catch (error) {
        console.error("Google OAuth Error:", error);
        return { success: false, error: "Error connecting to Google OAuth" };
    }
};


export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("authToken")}` }
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            window.dispatchEvent(new Event("storage")); 
            
            return { success: true, message: data.message };
        } else {
            return { success: false, error: data.error || "Logout failed" };
        }
    } catch (error) {
        console.error("🔴 Logout Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};


export const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");
    console.log("authToken getUserData:", authToken);

    if (!authToken) {
        console.warn("No authToken found. User is not logged in.");
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/user_data`, {
            method: "GET",
            headers: { "Authorization": authToken }
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        console.log("User Data Fetched:", data); 

        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
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



// pricing

export const updateUserPackage = async (packageType, price) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        return { success: false, error: "Token missing!" };
    }

    try {
        const response = await fetch(`${API_URL}/update_user_package`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: JSON.stringify({ package: packageType, price })
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, message: data.message };
        } else {
            return { success: false, error: data.error || "Error updating user package" };
        }
    } catch (error) {
        console.error("Update Package Error:", error);
        return { success: false, error: "Internal Server Error" };
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

    

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🟢 Top Importers Data:", data);
        return data;
    } catch (error) {
        console.error(" API Fetch Error:", error);
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

export const getRecommendedMonth = async (country, month, code) => {
    try {
        if (!country || !month || !code) {
            console.warn("⚠️ Missing required parameters:", { country, month, code });
            return null;
        }

        console.log("📤 Sending request to API with:", { country, month, code });

        const response = await fetch(`${API_URL}/recommended_month`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ country, month, code }), 
        });

        // console.log("📥 API Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseText = await response.text();
        // console.log("📜 Raw API Response:", responseText);

        const data = JSON.parse(responseText);
        // console.log("🟢 Parsed JSON Data:", data);

        return data;
    } catch (error) {
        console.error("🔴 Error fetching recommended month:", error.message);
        console.error("Stack Trace:", error.stack);
        return null;
    }
};




// country_price

export const getCountryPrice = async (code, country) => {
    try {
        const requestBody = JSON.stringify({ code, country });

        console.log("🟡 Sending request to API:", `${API_URL}/country_price`);
        console.log("🟡 Request Body:", requestBody);

        const response = await fetch(`${API_URL}/country_price`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });

        if (!response.ok) {
            const errorText = await response.text(); // قراءة محتوى الخطأ من الخادم
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }

        const data = await response.json();
        console.log("🟢 Response Data:", data);
        return data;
    } catch (error) {
        console.error("🔴 Error fetching country price:", error);
        return null;
    }
};



// country_quantity

export const getCountryQuantity = async (code, country) => {
    try {
        const response = await fetch(`${API_URL}/country_quantity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, country }),  // ✅ إرسال البيانات داخل body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("🔴 Error fetching country quantity:", error);
        return null;
    }
};


// country_growth_value

export const getCountryGrowthValue = async (code, country) => {
    try {
        const response = await fetch(`${API_URL}/country_growth_value`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, country }),  // ✅ إرسال البيانات داخل body
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
        const response = await fetch(`${API_URL}/country_growth_quantity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, country }), // ✅ إرسال البيانات في body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("🔴 Error fetching country growth quantity:", error);
        return null;
    }
};
