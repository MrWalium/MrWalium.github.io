<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Basic test to confirm PHP is working
echo "Hello, PHP is working on Vercel!";

// Use Guzzle to fetch data from an external site
require 'vendor/autoload.php'; // Make sure Guzzle is installed via Composer

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

header("Content-Type: text/html");

try {
    $client = new Client();
    $response = $client->request('GET', 'https://example.com', [
        'headers' => [
            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        ]
    ]);

    $html = $response->getBody()->getContents();
    echo $html;
} catch (RequestException $e) {
    error_log("Error fetching page: " . $e->getMessage());
    http_response_code(500);
    echo "Error fetching page";
}
?>
