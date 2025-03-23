// #include <Arduino.h>

// // put function declarations here:
// int myFunction(int, int);

// void setup() {
//   // put your setup code here, to run once:
//   int result = myFunction(2, 3);
// }

// void loop() {
//   // put your main code here, to run repeatedly:
// }

// // put function definitions here:
// int myFunction(int x, int y) {
//   return x + y;
// }

// #include <Arduino.h>
// #include <DHT.h>
// #include <WiFi.h>
// #include <WiFiClientSecure.h>
// #include <PubSubClient.h>

// // WiFi Credentials
// const char* ssid = "Galaxy A10s1182";
// const char* password = "12345678";

// // HiveMQ Cloud MQTT Broker Details
// const char* mqtt_server = "03d4193996fb46f9a16b3e6e0bf42f68.s1.eu.hivemq.cloud";
// const int mqtt_port = 8883;
// const char* topic = "fillguard/sensorData";

// // MQTT Authentication Credentials
// const char* mqtt_user = "fillguard";
// const char* mqtt_password = "Fillguardse31";

// // Add a device identifier (update this to match your actual device ObjectID or unique ID)
// const char* deviceId = "67d720b37d7381af28457192";

// // Ultrasonic Sensor Pins
// const int trigPin = 5;
// const int echoPin = 18;

// // Bin Configuration
// const float binHeight = 50.0;
// const float binMinHeight = 5.0;

// // DHT-11 Sensor
// #define DHTPIN 4
// #define DHTTYPE DHT11
// DHT dht(DHTPIN, DHTTYPE);

// // Use WiFiClientSecure for TLS connection
// WiFiClientSecure secureClient;
// PubSubClient client(secureClient);

// #define SOUND_SPEED 0.034  // Speed of sound in cm/μs

// void connectWiFi() {
//   WiFi.begin(ssid, password);
//   Serial.print("Connecting to WiFi...");
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("\n✅ Connected to WiFi!");
// }

// void connectMQTT() {
//   if (client.connected()) return;

//   Serial.print("Connecting to MQTT...");
//   while (!client.connected()) {
//     if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
//       Serial.println("\n✅ Connected to HiveMQ Cloud MQTT Broker!");
//       client.subscribe(topic);
//     } else {
//       Serial.print("❌ Failed, rc=");
//       Serial.print(client.state());
//       Serial.println(" Retrying in 5 seconds...");
//       delay(5000);
//     }
//   }
// }

// float calculateFillPercentage(float distanceCm) {
//   if (distanceCm > binHeight) distanceCm = binHeight;
//   if (distanceCm < binMinHeight) distanceCm = binMinHeight;
//   float fillLevel = (1 - ((distanceCm - binMinHeight) / (binHeight - binMinHeight))) * 100;
//   return constrain(fillLevel, 0, 100);
// }

// void setup() {
//   Serial.begin(115200);
//   pinMode(trigPin, OUTPUT);
//   pinMode(echoPin, INPUT);
//   dht.begin();

//   connectWiFi();

//   // Allow insecure connection for testing (use proper certificates in production)
//   secureClient.setInsecure();

//   client.setServer(mqtt_server, mqtt_port);
// }

// void loop() {
//   if (!client.connected()) {
//     connectMQTT();
//   }
//   client.loop();
  
//   // --- Read Ultrasonic Sensor ---
//   digitalWrite(trigPin, LOW);
//   delayMicroseconds(2);
//   digitalWrite(trigPin, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(trigPin, LOW);
  
//   long duration = pulseIn(echoPin, HIGH);
//   float distanceCm = duration * SOUND_SPEED / 2;
//   float binFillLevel = calculateFillPercentage(distanceCm);

//   // --- Read DHT Sensor ---
//   float humidity = dht.readHumidity();
//   float temperatureC = dht.readTemperature();

//   if (isnan(humidity) || isnan(temperatureC)) {
//     Serial.println("❌ Failed to read from DHT sensor!");
//   } else {
//     // Include the deviceId in the payload so that the server can populate the 'device' field
//     String payload = "{\"deviceId\": \"" + String(deviceId) + "\", \"fillLevel\": " + String(binFillLevel) +
//                      ", \"temperature\": " + String(temperatureC) +
//                      ", \"humidity\": " + String(humidity) + "}";
//     Serial.print("📡 Sending Data: ");
//     Serial.println(payload);
//     client.publish(topic, payload.c_str());
//   }

//   delay(5000);  // Delay between publishes
// }

#include <Arduino.h>
#include <DHT.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>

// WiFi Credentials
const char* ssid = "Galaxy A10s1182";
const char* password = "12345678";

// HiveMQ Cloud MQTT Broker Details
const char* mqtt_server = "03d4193996fb46f9a16b3e6e0bf42f68.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* topic = "fillguard/sensorData";

// MQTT Authentication Credentials
const char* mqtt_user = "fillguard";
const char* mqtt_password = "Fillguardse31";

// Device ID
const char* deviceId = "67d720b37d7381af28457192";

// Ultrasonic Sensor Pins
const int trigPin = 5;
const int echoPin = 18;

// Bin Configuration
const float binHeight = 50.0;
const float binMinHeight = 5.0;

// DHT-11 Sensor
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// GPS Module
static const int RXPin = 16, TXPin = 17;
static const uint32_t GPSBaud = 9600;
TinyGPSPlus gps;
HardwareSerial gpsSerial(1);

// Use WiFiClientSecure for TLS connection
WiFiClientSecure secureClient;
PubSubClient client(secureClient);

#define SOUND_SPEED 0.034  // Speed of sound in cm/μs

void connectWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Connected to WiFi!");
}

void connectMQTT() {
  if (client.connected()) return;

  Serial.print("Connecting to MQTT...");
  while (!client.connected()) {
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      Serial.println("\n✅ Connected to HiveMQ Cloud MQTT Broker!");
      client.subscribe(topic);
    } else {
      Serial.print("❌ Failed, rc=");
      Serial.print(client.state());
      Serial.println(" Retrying in 5 seconds...");
      delay(5000);
    }
  }
}

float calculateFillPercentage(float distanceCm) {
  if (distanceCm > binHeight) distanceCm = binHeight;
  if (distanceCm < binMinHeight) distanceCm = binMinHeight;
  float fillLevel = (1 - ((distanceCm - binMinHeight) / (binHeight - binMinHeight))) * 100;
  return constrain(fillLevel, 0, 100);
}

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  dht.begin();

  // Start GPS
  gpsSerial.begin(GPSBaud, SERIAL_8N1, RXPin, TXPin);

  connectWiFi();

  // Allow insecure connection for testing (use proper certificates in production)
  secureClient.setInsecure();

  client.setServer(mqtt_server, mqtt_port);
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
  float distanceCm = duration * SOUND_SPEED / 2;
  float binFillLevel = calculateFillPercentage(distanceCm);

  // --- Read DHT Sensor ---
  float humidity = dht.readHumidity();
  float temperatureC = dht.readTemperature();

  // --- Read GPS Data ---
  String latitude = "0.0";
  String longitude = "0.0";

  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
    if (gps.location.isUpdated()) {
      latitude = String(gps.location.lat(), 6);
      longitude = String(gps.location.lng(), 6);
      break;
    }
  }

  if (isnan(humidity) || isnan(temperatureC)) {
    Serial.println("❌ Failed to read from DHT sensor!");
  } else {
    // JSON payload including GPS data
    String payload = "{\"deviceId\": \"" + String(deviceId) + 
                     "\", \"fillLevel\": " + String(binFillLevel) +
                     ", \"temperature\": " + String(temperatureC) +
                     ", \"humidity\": " + String(humidity) +
                     ", \"latitude\": " + latitude +
                     ", \"longitude\": " + longitude + "}";
    
    Serial.print("📡 Sending Data: ");
    Serial.println(payload);
    client.publish(topic, payload.c_str());
  }

  delay(5000);  // Delay between publishes
}