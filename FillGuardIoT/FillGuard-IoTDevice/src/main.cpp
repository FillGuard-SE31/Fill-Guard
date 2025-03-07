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

#include <Arduino.h>
#include <DHT.h>

// Ultrasonic Sensor Pins
const int trigPin = 5;
const int echoPin = 18;

// DHT-11 Sensor
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Bin Configuration (Adjust These Values)
const float binHeight = 50.0;     // Height of empty bin in cm
const float binMinHeight = 5.0;   // Min height sensor can detect (to avoid zero distance errors)

#define SOUND_SPEED 0.034

void setup() {
    Serial.begin(115200);
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    dht.begin();
}

void loop() {
    // --- Ultrasonic Sensor Measurement ---
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    long duration = pulseIn(echoPin, HIGH);
    float distanceCm = duration * SOUND_SPEED / 2;

    // --- Convert to Bin Fill Level ---
    float fillLevel = (1 - ((distanceCm - binMinHeight) / (binHeight - binMinHeight))) * 100;
    fillLevel = constrain(fillLevel, 0, 100); // Ensure it's between 0% and 100%

    // --- DHT Sensor ---
    float humidity = dht.readHumidity();
    float temperatureC = dht.readTemperature();

    if (isnan(humidity) || isnan(temperatureC)) {
        Serial.println("Failed to read from DHT sensor!");
    } else {
        Serial.print("Fill Level: ");
        Serial.print(fillLevel);
        Serial.println("%");

        Serial.print("Temperature: ");
        Serial.print(temperatureC);
        Serial.println("°C");

        Serial.print("Humidity: ");
        Serial.print(humidity);
        Serial.println("%");
    }

    delay(2000);
}
