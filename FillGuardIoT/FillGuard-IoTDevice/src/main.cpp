//Initial IoT code (Code version 1)

// #include <Arduino.h>
// #include <DHT.h>

// // Ultrasonic Sensor Pins
// const int trigPin = 5;
// const int echoPin = 18;

// // DHT-11 Sensor
// #define DHTPIN 4
// #define DHTTYPE DHT11
// DHT dht(DHTPIN, DHTTYPE);

// // Constants
// #define SOUND_SPEED 0.034
// #define CM_TO_INCH 0.393701

// void setup() {
//     Serial.begin(115200, SERIAL_8N1);
//     delay(1000);

//     // Initialize pins
//     pinMode(trigPin, OUTPUT);
//     pinMode(echoPin, INPUT);
    
//     // Start DHT sensor
//     dht.begin();
// }

// void loop() {
//     // --- Ultrasonic Sensor ---
//     digitalWrite(trigPin, LOW);
//     delayMicroseconds(2);
//     digitalWrite(trigPin, HIGH);
//     delayMicroseconds(10);
//     digitalWrite(trigPin, LOW);

//     long duration = pulseIn(echoPin, HIGH);
//     float distanceCm = duration * SOUND_SPEED / 2;
//     float distanceInch = distanceCm * CM_TO_INCH;

//     Serial.print("Distance (cm): ");
//     Serial.println(distanceCm);
//     Serial.print("Distance (inch): ");
//     Serial.println(distanceInch);

//     // --- DHT Sensor ---
//     float humidity = dht.readHumidity();
//     float temperatureC = dht.readTemperature();
//     float temperatureF = dht.readTemperature(true);

//     if (isnan(humidity) || isnan(temperatureC) || isnan(temperatureF)) {
//         Serial.println("Failed to read from DHT sensor!");
//     } else {
//         Serial.print("Humidity: ");
//         Serial.print(humidity);
//         Serial.print("%  Temperature: ");
//         Serial.print(temperatureC);
//         Serial.print("°C ");
//         Serial.print(temperatureF);
//         Serial.println("°F");
//     }

//     delay(2000);
// }


// IoT Code version 2

// #include <Arduino.h>
// #include <DHT.h>

// // Ultrasonic Sensor Pins
// const int trigPin = 5;
// const int echoPin = 18;

// // DHT-11 Sensor
// #define DHTPIN 4
// #define DHTTYPE DHT11
// DHT dht(DHTPIN, DHTTYPE);

// // Bin Configuration (Adjust These Values)
// const float binHeight = 50.0;     // Height of empty bin in cm
// const float binMinHeight = 5.0;   // Min height sensor can detect (to avoid zero distance errors)

// #define SOUND_SPEED 0.034

// void setup() {
//     Serial.begin(115200);
//     pinMode(trigPin, OUTPUT);
//     pinMode(echoPin, INPUT);
//     dht.begin();
// }

// void loop() {
//     // --- Ultrasonic Sensor Measurement ---
//     digitalWrite(trigPin, LOW);
//     delayMicroseconds(2);
//     digitalWrite(trigPin, HIGH);
//     delayMicroseconds(10);
//     digitalWrite(trigPin, LOW);

//     long duration = pulseIn(echoPin, HIGH);
//     float distanceCm = duration * SOUND_SPEED / 2;

//     // --- Convert to Bin Fill Level ---
//     float fillLevel = (1 - ((distanceCm - binMinHeight) / (binHeight - binMinHeight))) * 100;
//     fillLevel = constrain(fillLevel, 0, 100); // Ensure it's between 0% and 100%

//     // --- DHT Sensor ---
//     float humidity = dht.readHumidity();
//     float temperatureC = dht.readTemperature();

//     if (isnan(humidity) || isnan(temperatureC)) {
//         Serial.println("Failed to read from DHT sensor!");
//     } else {
//         Serial.print("Fill Level: ");
//         Serial.print(fillLevel);
//         Serial.println("%");

//         Serial.print("Temperature: ");
//         Serial.print(temperatureC);
//         Serial.println("°C");

//         Serial.print("Humidity: ");
//         Serial.print(humidity);
//         Serial.println("%");
//     }

//     delay(2000);
// }


// IoT Final Code Version

#include <Arduino.h>
#include <DHT.h>
#include <WiFi.h>
#include <PubSubClient.h>

// WiFi Credentials
const char* ssid = "Your_WiFi_Name";
const char* password = "Your_WiFi_Password";

// MQTT Broker Details
const char* mqtt_server = "broker.hivemq.com";  
const char* topic = "fillguard/sensorData";

// Ultrasonic Sensor Pins
const int trigPin = 5;
const int echoPin = 18;

// Bin Configuration
// Define Bin Height (in cm) - Measure and update this
const float binHeight = 50.0;
// Minimum detectable height (To avoid zero-distance errors)
const float binMinHeight = 5.0;

// DHT-11 Sensor
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// MQTT Client Setup
WiFiClient espClient;
PubSubClient client(espClient);

#define SOUND_SPEED 0.034  // Speed of sound in cm/μs

// Function to connect to WiFi
void connectWiFi() {
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\n✅ Connected to WiFi!");
}

// Function to connect to MQTT Broker
void connectMQTT() {
    while (!client.connected()) {
        Serial.print("Connecting to MQTT...");
        if (client.connect("ESP32Client")) {
            Serial.println("\n✅ Connected to MQTT Broker!");
            client.subscribe(topic);
        } else {
            Serial.print("❌ Failed, rc=");
            Serial.print(client.state());
            Serial.println(" Retrying in 5 seconds...");
            delay(5000);
        }
    }
}

// Function to calculate bin fill percentage
float calculateFillPercentage(float distanceCm) {
    // Ensure distance is within expected range
    if (distanceCm > binHeight) distanceCm = binHeight; // Prevent values above max bin height
    if (distanceCm < binMinHeight) distanceCm = binMinHeight; // Prevent unrealistic close distances


    float fillLevel = (1 - ((distanceCm - binMinHeight) / (binHeight - binMinHeight))) * 100;
    return constrain(fillLevel, 0, 100);  // Ensure it's between 0% and 100%
}

void setup() {
    Serial.begin(115200);
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    dht.begin();

    connectWiFi();
    client.setServer(mqtt_server, 1883);
}

void loop() {
    if (!client.connected()) {
        connectMQTT();
    }
    client.loop();

    // --- Read Ultrasonic Sensor ---
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    
    long duration = pulseIn(echoPin, HIGH);
    float distanceCm = duration * SOUND_SPEED / 2;  // Convert to cm

    // --- Calculate Bin Fill Level ---
    float binFillLevel = calculateFillPercentage(distanceCm);

    // --- Read DHT Sensor ---
    float humidity = dht.readHumidity();
    float temperatureC = dht.readTemperature();

    if (isnan(humidity) || isnan(temperatureC)) {
        Serial.println("❌ Failed to read from DHT sensor!");
    } else {
        // --- Send Data to MQTT Broker ---
        String payload = "{\"fillLevel\": " + String(binFillLevel) +
                         ", \"temperature\": " + String(temperatureC) +
                         ", \"humidity\": " + String(humidity) + "}";

        Serial.print("📡 Sending Data: ");
        Serial.println(payload);

        client.publish(topic, payload.c_str());
    }

    delay(2000);  // Send data every 2 seconds
}

