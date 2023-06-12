# Algorithms


```bash
    # Reduce congestion in the network
    - Leaky Bucket Algorithm
        - nginx

    - Token Bucket Algorithm
```

## JWT

JWT ile üretilen token Base64 ile kodlanmış 3 ana kısımdan oluşmaktadır. Bunlar Header(Başlık), Payload(Veri), Signature(İmza) kısımlarıdır. aaa.bbb.ccc şeklinde noktalarla ayrılmış 3 alan bulunmaktadır.

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJ0ZWJyaWtsZXIhIDopIn0.sTLXY5iAs1IzJJ-8GVP_pMR65qqgCUpbMl-aSPcrQHc
```

    Header
        - Token tipi ve algoritma
    Payload
        - Registered Claims:
            Kullanılması zorunlu değil ama önerilir.
            - iss (issuer), exp (expiration time), sub(subject), aud(audience).

        - Public claims

        - Private claims

    Signature
        Token son kısmı, bu kısım için header, payload ve secret key gereklidir. İmza ile veri bütünlüğü garanti altına alınır.


Gelen tokenda Header, Payload ve secret key kullanılarak Signature üretilir. Gelen signature ve üretilen signature aynı ise doğrulama başarılı sayılır.

[JSON Web Tokens - jwt.io](https://jwt.io/)
