async function generatePizzaImage() {
    let selectedIngredients = [];
    document.querySelectorAll('input[name="ingredient"]:checked').forEach((checkbox) => {
        selectedIngredients.push(checkbox.value);
    });

    let description = `A deliciously looking pizza with only the following ingredients: ${selectedIngredients.join(", ")}, viewed from above, with the whole plate visible`;

    try {
        // Maak een API-aanroep naar de OpenAI DALL-E API
        let response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-mM_LwD3H_KsJDAYQf2zzvJ0wiU4ubpaLmiT9WrvA4gT3BlbkFJmptripU0LDbm0UBSYk-S3uriFAnNqCuqoPu21CGdYA`  // Vervang met je eigen API-sleutel
            },
            body: JSON.stringify({
                prompt: description,
                // prompt: 'a pizza calzone',
                n: 1,
                size: "512x512"
            })
        });

        if (response.ok) {
            let data = await response.json();
            document.getElementById('pizzaImage').src = data.data[0].url;
        } else {
            console.error('Error generating pizza image:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

