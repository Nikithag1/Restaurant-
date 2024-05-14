// ChatbotFunctions.js

export const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi; // return chat <li> element
}

export const generateResponse = async (userMessage, chatbox) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // Use environment variable
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        })
    }

    try {
        const response = await fetch(API_URL, requestOptions);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const messageElement = document.createElement("p");
        messageElement.textContent = data.choices[0].message.content.trim();
        chatbox.appendChild(messageElement);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    } catch (error) {
        console.error('Error:', error);
        const errorMessageElement = document.createElement("p");
        errorMessageElement.textContent = "Oops! Something went wrong. Please try again.";
        errorMessageElement.classList.add("error");
        chatbox.appendChild(errorMessageElement);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
}

// Other functions and constants can be added here if needed
