/**
 * Calls the Google Gemini API 1.5 Flash with the given prompt.
 *
 * @param {...string} args - The prompt parts to be concatenated.
 * @return {string} The generated response from Gemini.
 * @customfunction
 */
function GEMINI() {
  // Concatenate all arguments into a single prompt
  var prompt = Array.prototype.slice.call(arguments).join(" ");

  // Your Gemini API key (replace with your actual API key)
  var apiKey = "<REPLACE_WITH_YOUR_GEMINI_API_KEY>";

  // Gemini API endpoint
  var apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  // Prepare the request payload
  var payload = {
    "contents": [{
      "parts":[{
        "text": prompt
      }]
    }]
  };

  // Set up the request options
  var options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    "payload": JSON.stringify(payload)
  };

  try {
    // Make the API request
    var response = UrlFetchApp.fetch(apiUrl, options);
    var responseData = JSON.parse(response.getContentText());

    // Extract and return the generated text
    if (responseData.candidates && responseData.candidates.length > 0) {
      return responseData.candidates[0].content.parts[0].text;
    } else {
      return "No response generated.";
    }
  } catch (error) {
    return "Error: " + error.toString();
  }
}


