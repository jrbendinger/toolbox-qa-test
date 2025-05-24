---
name: "Bug Report"
about: Bug found at "https://echo-serv.tbxnet.com/v1/qa/test2"
title: 'Bug Report'
labels: 'Bug'
assignees: 'Assignee1'

---

### Environment
URL: <https://echo-serv.tbxnet.com/v1/qa/test2>

Stage: v1/qa/test2

Screenshot: <https://ibb.co/KzFk738z>

### Logs
```log
test2:1             
GET https://echo-serv.tbxnet.com/v1/qa/test2 500 (Internal Server Error)
injection-topics.js:1 Browsing Topics API removed
```

### Network Requests
```json
{
  "log": {
    "version": "1.2",
    "creator": {
      "name": "WebInspector",
      "version": "537.36"
    },
    "pages": [
      {
        "startedDateTime": "2025-05-22T10:31:38.057Z",
        "id": "page_2",
        "title": "https://echo-serv.tbxnet.com/v1/qa/test2",
        "pageTimings": {
          "onContentLoad": 408.39200001209974,
          "onLoad": 540.1149999815971
        }
      }
    ],
    "entries": [
      {
        "_connectionId": "203340",
        "_initiator": {
          "type": "other"
        },
        "_priority": "VeryHigh",
        "_resourceType": "document",
        "cache": {},
        "connection": "443",
        "pageref": "page_2",
        "request": {
          "method": "GET",
          "url": "https://echo-serv.tbxnet.com/v1/qa/test2",
          "httpVersion": "h3",
          "headers": [
            {
              "name": ":authority",
              "value": "echo-serv.tbxnet.com"
            },
            {
              "name": ":method",
              "value": "GET"
            },
            {
              "name": ":path",
              "value": "/v1/qa/test2"
            },
            {
              "name": ":scheme",
              "value": "https"
            },
            {
              "name": "accept",
              "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
            },
            {
              "name": "accept-encoding",
              "value": "gzip, deflate, br, zstd"
            },
            {
              "name": "accept-language",
              "value": "es-ES,es;q=0.9,en;q=0.8"
            },
            {
              "name": "priority",
              "value": "u=0, i"
            },
            {
              "name": "sec-ch-ua",
              "value": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\""
            },
            {
              "name": "sec-ch-ua-mobile",
              "value": "?0"
            },
            {
              "name": "sec-ch-ua-platform",
              "value": "\"Windows\""
            },
            {
              "name": "sec-fetch-dest",
              "value": "document"
            },
            {
              "name": "sec-fetch-mode",
              "value": "navigate"
            },
            {
              "name": "sec-fetch-site",
              "value": "none"
            },
            {
              "name": "sec-fetch-user",
              "value": "?1"
            },
            {
              "name": "upgrade-insecure-requests",
              "value": "1"
            },
            {
              "name": "user-agent",
              "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
            }
          ],
          "queryString": [],
          "cookies": [],
          "headersSize": -1,
          "bodySize": 0
        },
        "response": {
          "status": 500,
          "statusText": "",
          "httpVersion": "h3",
          "headers": [
            {
              "name": "alt-svc",
              "value": "h3=\":443\"; ma=86400"
            },
            {
              "name": "cf-cache-status",
              "value": "DYNAMIC"
            },
            {
              "name": "cf-ray",
              "value": "943ba51fb82d0360-MAD"
            },
            {
              "name": "content-length",
              "value": "73"
            },
            {
              "name": "content-type",
              "value": "application/json; charset=utf-8"
            },
            {
              "name": "date",
              "value": "Thu, 22 May 2025 10:31:38 GMT"
            },
            {
              "name": "etag",
              "value": "W/\"49-ArYeecwz7A1vE9c4IF/dQ6Ufivc\""
            },
            {
              "name": "priority",
              "value": "u=0,i"
            },
            {
              "name": "server",
              "value": "cloudflare"
            },
            {
              "name": "server-timing",
              "value": "cfExtPri"
            },
            {
              "name": "vary",
              "value": "Origin, Accept-Encoding"
            }
          ],
          "cookies": [],
          "content": {
            "size": 73,
            "mimeType": "application/json"
          },
          "redirectURL": "",
          "headersSize": -1,
          "bodySize": -1,
          "_transferSize": 324,
          "_error": null,
          "_fetchedViaServiceWorker": false
        },
        "serverIPAddress": "104.18.10.69",
        "startedDateTime": "2025-05-22T10:31:38.056Z",
        "time": 337.9600000509173,
        "timings": {
          "blocked": 2.106000022299588,
          "dns": 0.013000000000000012,
          "ssl": 37.722,
          "connect": 38.067,
          "send": 0,
          "wait": 297.0179999764115,
          "receive": 0.7560000522062182,
          "_blocked_queueing": 1.1190000222995877,
          "_workerStart": -1,
          "_workerReady": -1,
          "_workerFetchStart": -1,
          "_workerRespondWithSettled": -1
        }
      }
    ]
  }
}
```

### Browser Metadata
| Field      | Value         |
|------------|---------------|
| Browser    | Chrome        |
| Version    | 136.0.7103.114|
| Dimensions | 1707x838      |
| ...        | ...           |

### Device Metadata
| Field      | Value         |
|------------|---------------|
| Device     | Razer Blade 17 (Mid 2021) - RZ09-0406 |
| Dimensions | 2560x1440     |
| OS         | Microsoft Windows 11 Home 10.0.26100 Build 26100 |
| Processor	 | i7-11800H     |
| ...        | ...           |

### User Data
| Field      | Value                                                         |
|------------|---------------------------------------------------------------|
| Id         | guest                                                         |
| Local Time | Thu, 22 May 2025 10:31:38 GMT                                 |
| ...        | ...                                                           |

### Custom Data
| Field      | Value         |
|------------|---------------|
| ...        | ...           |
