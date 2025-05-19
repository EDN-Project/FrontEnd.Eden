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

        if (data.token) {
            localStorage.setItem("authToken", data.token); 
            return { success: true, token: data.token };
        } else {
            return { success: false, error: data.error || "Login failed" };
        }
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};

export const googleLogin = () => {
    // Use replace to avoid adding to browser history stack
    window.location.replace(`${API_URL}/auth/google`);
};

export const handleGoogleCallback = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        
        if (!code) {
            throw new Error("No authorization code received from Google");
        }
        
        // Send the code to your backend to complete the OAuth flow
        const response = await fetch(`${API_URL}/auth/google/callback?code=${code}&state=${state}`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();
        
        // Check for both user data and token in the response
        if (data.email) {
            if (data.token) {
                localStorage.setItem("authToken", data.token);
            } else {
                console.warn("No token received from Google OAuth callback");
            }
            
            localStorage.setItem("userData", JSON.stringify({
                name: data.name,
                email: data.email,
                picture: data.picture
            }));
            
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

export const checkTokenValidity = async () => {
    const authToken = localStorage.getItem("authToken");
    
    if (!authToken) {
        return { valid: false, error: "No token found" };
    }
    
    try {
        const response = await fetch(`${API_URL}/check_token`, {
            method: "GET",
            headers: { "Authorization": authToken }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return { valid: true };
        } else {
            // Token invalid or expired
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            window.dispatchEvent(new Event("storage"));
            return { valid: false, error: data.error || "Invalid token" };
        }
    } catch (error) {
        console.error("Token validation error:", error);
        return { valid: false, error: "Error validating token" };
    }
};

export const logoutUser = () => {
    try {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        window.dispatchEvent(new Event("storage")); 
        
        return { success: true, message: "User logged out successfully" };
    } catch (error) {
        console.error("Logout Error:", error);
        return { success: false, error: "Error during logout" };
    }
};

export const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        console.warn("No authToken found. User is not logged in.");
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/user_data`, {
            method: "GET",
            headers: { "Authorization": authToken }
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem("authToken");
                localStorage.removeItem("userData");
                window.dispatchEvent(new Event("storage"));
                throw new Error("Session expired. Please login again.");
            }
            throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
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
        console.log(" Top Importers Data:", data);
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
        console.log("Country Sent Successfully:", data);
        return data;
    } catch (error) {
        console.error(" Error Sending Country:", error);
        return null;
    }
};


// recommended_month

export const getRecommendedMonth = async (country, month, code) => {
    try {
        if (!country || !month || !code) {
            console.warn(" Missing required parameters:", { country, month, code });
            return null;
        }

        console.log(" Sending request to API with:", { country, month, code });

        const response = await fetch(`${API_URL}/recommended_month`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ country, month, code }), 
        });

        // console.log(" API Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseText = await response.text();
        // console.log(" Raw API Response:", responseText);

        const data = JSON.parse(responseText);
        // console.log(" Parsed JSON Data:", data);

        return data;
    } catch (error) {
        console.error(" Error fetching recommended month:", error.message);
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
            const errorText = await response.text(); 
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }

        const data = await response.json();
        console.log("Response Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching country price:", error);
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



// ✅ Get Latest Sensor Reading
export const getLatestReadings = async () => {
    try {
        const authToken = localStorage.getItem("authToken");
        
        const response = await fetch(`${API_URL}/readings/latest`, {
            method: "GET",
            headers: { 
                ...(authToken && { "Authorization": authToken })
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch latest readings: ${response.status}`);
        }

        // console.log('sssssssss------>',response)
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching latest readings:", error);
        throw error;
    }
};


// getDailyReadings


export const getDailyReadings = async (date) => {
    try {
        const response = await fetch(`${API_URL}/readings/daily`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ date }),
        });

        const data = await response.json();

        // console.log('data---------------kkkkkkk',data)

        if (response.ok && data.status === "success") {
            return { success: true, data };
        } else {
            return { success: false, error: data.error || "Failed to fetch readings" };
        }
    } catch (error) {
        console.error("Get Daily Readings Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};


// getMonthlyReadings

export const getMonthlyReadings = async (month, year) => {
    try {
        const response = await fetch(`${API_URL}/readings/monthly`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ month, year }),
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data };
        } else {
            return { success: false, error: data.error || "Failed to fetch monthly readings" };
        }
    } catch (error) {
        console.error("Get Monthly Readings Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};

// getReadingsBetweenDates

export const getReadingsBetweenDates = async (start_date, end_date) => {
    try {
        const response = await fetch(`${API_URL}/readings/between`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ start_date, end_date }),
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data };
        } else {
            return { success: false, error: data.error || "Failed to fetch readings" };
        }
    } catch (error) {
        console.error("Get Readings Between Dates Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};



// 

export const getDailyActions = async (date) => {
    try {
        const response = await fetch(`${API_URL}/actions/daily`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ date }),
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data };
        } else {
            return { success: false, error: data.error || "Failed to fetch daily actions" };
        }
    } catch (error) {
        console.error("Get Daily Actions Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};


export const getMonthlyActions = async (month, year) => {
    try {
        const response = await fetch(`${API_URL}/actions/monthly`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ month, year }),
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data };
        } else {
            return { success: false, error: data.error || "Failed to fetch monthly actions" };
        }
    } catch (error) {
        console.error("Get Monthly Actions Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};


export const getActionsBetweenDates = async (start_date, end_date) => {
    try {
        const response = await fetch(`${API_URL}/actions/between`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ start_date, end_date }),
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data };
        } else {
            return { success: false, error: data.error || "Failed to fetch actions between dates" };
        }
    } catch (error) {
        console.error("Get Actions Between Dates Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};


// 
export const getStageNutrients = async () => {
    try {
        const response = await fetch(`${API_URL}/get_stage_nutrients`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            return { success: true, data };
        } else {
            return { success: false, error: data.error || "Failed to fetch stage nutrients" };
        }
    } catch (error) {
        console.error("Get Stage Nutrients Error:", error);
        return { success: false, error: "Error connecting to server" };
    }
};
