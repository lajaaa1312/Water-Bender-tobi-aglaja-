<?php
$element = "air"; // Replace 'your_element' with the actual element value

// Construct the API URL
$url = "https://last-airbender-api.fly.dev/api/v1/characters?weapon=Air";

// Fetch data from the API
$data = file_get_contents($url);

// Check if data is fetched successfully
if ($data === false) {
    // Handle error if unable to fetch data
    $response = array("error" => "Error fetching element");
} else {
    // Convert fetched data to JSON format
    $response = json_decode($data, true);
    
    // Check if JSON decoding was successful
    if ($response === null) {
        // Handle error if unable to decode JSON
        $response = array("error" => "Error decoding JSON");
    }
}

// Output the JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
