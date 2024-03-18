# Java

## SSL Certificates Adding

First make 100% sure you know which JRE or JDK is being used to run your program. Process Explorer can help you with this or you can use: System.out.println(System.getProperty("java.home"));

You can download the SSL certificate from a web server that is already using it like this:
```bash
$ echo -n | openssl s_client -connect www.example.com:443 | \
   sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > /tmp/examplecert.crt
```


Optionally verify the certificate information:
```bash
$ openssl x509 -in /tmp/examplecert.crt -text
```

Import the certificate into the Java cacerts keystore:

```bash
$ keytool -import -trustcacerts -keystore /opt/java/jre/lib/security/cacerts \
   -storepass changeit -noprompt -alias mycert -file /tmp/examplecert.crt
```

Source
- https://stackoverflow.com/questions/11617210/how-to-properly-import-a-selfsigned-certificate-into-java-keystore-that-is-avail
- https://stackoverflow.com/questions/4325263/how-to-import-a-cer-certificate-into-a-java-keystore