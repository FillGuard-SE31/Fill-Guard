#include <Arduino.h>
#include <DHT.h>

// Ultrasonic Sensor Pins
const int trigPin = 5;
const int echoPin = 18;

// DHT-11 Sensor
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Constants
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701

void setup() {
    Serial.begin(115200, SERIAL_8N1);
    delay(1000);

    // Initialize pins
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    
    // Start DHT sensor
    dht.begin();
}

void loop() {
    // --- Ultrasonic Sensor ---
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    long duration = pulseIn(echoPin, HIGH);
    float distanceCm = duration * SOUND_SPEED / 2;
    float distanceInch = distanceCm * CM_TO_INCH;

    Serial.print("Distance (cm): ");
    Serial.println(distanceCm);
    Serial.print("Distance (inch): ");
    Serial.println(distanceInch);

    // --- DHT Sensor ---
    float humidity = dht.readHumidity();
    float temperatureC = dht.readTemperature();
    float temperatureF = dht.readTemperature(true);

    if (isnan(humidity) || isnan(temperatureC) || isnan(temperatureF)) {
        Serial.println("Failed to read from DHT sensor!");
    } else {
        Serial.print("Humidity: ");
        Serial.print(humidity);
        Serial.print("%  Temperature: ");
        Serial.print(temperatureC);
        Serial.print("°C ");
        Serial.print(temperatureF);
        Serial.println("°F");
    }

    delay(2000);
}
