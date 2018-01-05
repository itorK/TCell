define({ "api": [
  {
    "type": "post",
    "url": "/client-enter",
    "title": "Post info abot client with disability that enters depratment",
    "name": "ClientEnter",
    "group": "ClientEnter",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "beacon",
            "description": "<p>beacon.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "beacon.uuid",
            "description": "<p>uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "beacon.major",
            "description": "<p>major.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nik",
            "description": "<p>client's nik.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost/client-enter\n\n{\n   \"beacon\": { \"uuid\": \"b9407f30-f5f8-466e-aff9-25556b57feed\", \"major\": \"40858\" },\n   \"nik\": \"1111\"\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "server/routes/apidoc.ts",
    "groupTitle": "ClientEnter"
  },
  {
    "type": "get",
    "url": "/customer",
    "title": "Get list of customers",
    "name": "Customer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nik",
            "description": "<p>nik.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>photo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date.</p>"
          },
          {
            "group": "Parameter",
            "type": "disType",
            "optional": false,
            "field": "disType",
            "description": "<p>type of disability.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \n{\nuuidBeacon: [{\n     _id: \"59ca410ca5e9da07b4b7aba2\",\n     nik: \"123456789\",\n     photo: \"zzz\",\n     date: \"Tue Feb 03 1981 16:39:46 GMT+0100 (Środkowoeuropejski czas stand.)\",\n     disType: \"niewidomy\",\n     __v: 0\n}],\nsuccess: true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/apidoc.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customer",
    "title": "Post info abot customer with disability",
    "name": "CustomerPOST",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nik",
            "description": "<p>nik.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>photo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>date.</p>"
          },
          {
            "group": "Parameter",
            "type": "disType",
            "optional": false,
            "field": "disType",
            "description": "<p>type of disability.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost/client-enter\n{ \"nik\": \"123456789\", \"photo\": \"zzz\", \"date\": \"Tue Feb 03 1981 16:39:46 GMT+0100 (Środkowoeuropejski czas stand.)\" , \"disType\": \"niewidomy\"}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "server/routes/apidoc.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/department",
    "title": "Get list of departments",
    "name": "Department",
    "group": "Department",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "beacon",
            "description": "<p>beacon.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "beacon.uuid",
            "description": "<p>uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "beacon.major",
            "description": "<p>major.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "computers",
            "description": "<p>list of IPs to push notification.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \n{\ndepartment: [\n{\n _id: \"59cceb8f3a96ad02345ee24c\",\n __v: 0,\n computers: [\n  \"195.20.110.208\"\n ],\n beacon: {\n  uuid: \"b9407f30-f5f8-466e-aff9-25556b57feed\",\n  major: \"40858\"\n }\n}],\nsuccess: true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/apidoc.ts",
    "groupTitle": "Department"
  },
  {
    "type": "post",
    "url": "/department",
    "title": "Add department",
    "name": "DepartmentPOST",
    "group": "Department",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "beacon",
            "description": "<p>beacon.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "beacon.uuid",
            "description": "<p>uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "beacon.major",
            "description": "<p>major.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "computers",
            "description": "<p>list of IPs to push notification.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost/client-enter\n{ \"nik\": \"123456789\", \"photo\": \"zzz\", \"date\": \"Tue Feb 03 1981 16:39:46 GMT+0100 (Środkowoeuropejski czas stand.)\" , \"disType\": \"niewidomy\"}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "server/routes/apidoc.ts",
    "groupTitle": "Department"
  },
  {
    "type": "get",
    "url": "/uuid-beacon",
    "title": "Get list of uuids",
    "name": "UuidBeacon",
    "group": "UuidBeacon",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>uuid.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>major.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "minor",
            "description": "<p>minor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>color.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "department",
            "description": "<p>department.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \n{\nuuidBeacon: [{\n     _id: \"59ca410ca5e9da07b4b7aba2\",\n     uuid: \"test\",\n     major: \"42259\",\n     minor: \"z\",\n     color: \"BLUE\",\n     department: \"ODDZIAŁ UEP 42259\",\n     __v: 0\n}],\nsuccess: true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/apidoc.ts",
    "groupTitle": "UuidBeacon"
  },
  {
    "type": "delete",
    "url": "/uuid-beacon",
    "title": "Delete uuid",
    "name": "UuidBeaconDelete",
    "group": "UuidBeacon",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id of uuidBeacon to remove.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost/uuid-beacon\nid=59ca3fce310d3f310049c064",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "server/routes/apidoc.ts",
    "groupTitle": "UuidBeacon"
  },
  {
    "type": "post",
    "url": "/uuid-beacon",
    "title": "Post uuid",
    "name": "UuidBeaconPost",
    "group": "UuidBeacon",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>major.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "minor",
            "description": "<p>minor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>color.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "department",
            "description": "<p>department.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost/uuid-beacon\n{ \"uuid\": \"test\", \"major\": \"42259\", \"minor\": \"z\", \"color\": \"BLUE\", \"department\": \"ODDZIAŁ UEP 42259\" }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "server/routes/apidoc.ts",
    "groupTitle": "UuidBeacon"
  }
] });
