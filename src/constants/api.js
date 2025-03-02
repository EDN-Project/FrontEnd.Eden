const API_URL = "http://127.0.0.1:5000"; // تأكدي أن هذا هو رابط الـ Backend الصحيح

// 🟢 تسجيل مستخدم جديد
export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
};

// 🟢 تأكيد رمز التسجيل
export const confirmRegistration = async (email, code) => {
    const response = await fetch(`${API_URL}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code })
    });
    return response.json();
};

// 🟢 تسجيل الدخول
export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
};

// 🟢 إرسال رمز إعادة تعيين كلمة المرور
export const forgotPassword = async (email) => {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });
    return response.json();
};

// 🟢 إعادة تعيين كلمة المرور
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


// 🟢 جلب بيانات المستخدم
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
