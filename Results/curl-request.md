## Revision de una Request en formato cURL:
- Identifique el error en el siguiente llamado a un API REST, por favor.:

---
```bash
curl -L -X POST 'https://echo-serv.tbxnet.com/v1/test'
-H 'accept: application/json'
-H 'Content-Type: application/json'
--data-raw '{
"contact1": "David "Dave" Letterman",
"price": "30.00",
"details": "Greatest '''Hits''' Album"
}'
```

El problema esta en el formato del JSON. Las comillas que engloban el string "Dave" no estan escapadas, entonces cuando el codigo se interpreta no cumple con el formato JSON. Para arreglarlo, hay que escaparlas con el caracter especial ```\```. Arreglado, quedaria de la siguiente manera:

---
```bash
curl -L -X POST 'https://echo-serv.tbxnet.com/v1/test'
-H 'accept: application/json'
-H 'Content-Type: application/json'
--data-raw '{
"contact1": "David \"Dave\" Letterman",
"price": "30.00",
"details": "Greatest '''Hits''' Album"
}'
```