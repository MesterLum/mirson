#define DEBUG(a) Serial.println(a);
bool foco1 = false;
bool foco2 = false;


void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  
}

void loop() {
  if (Serial.available())
   {
      char data = Serial.read();
 
      if (data == '1')
      {
         data -= '1';
         DEBUG((char)data);
         
         if (foco1){
          digitalWrite(2, HIGH);
         } else {
          digitalWrite(2, LOW);
         }
         foco1 = !foco1;
         
      }
      else if( data == '2'){
        data -= '2';
         DEBUG((char)data);
         if (foco2){
          digitalWrite(3, HIGH);
         } else {
          digitalWrite(3, LOW);
         }
         foco2 = !foco2;
      }
   }

   if (foco1)
      Serial.print("1,");
   else
    Serial.print("0,");

   if (foco2)
    Serial.println("1");
   else
    Serial.println("0");
}
Chat Conversation End
Type a message...

