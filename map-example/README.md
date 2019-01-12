# Making a map

![Map](map.png)

A lookup table of providers and `SMART` rates
```
{
  "WMECo d/b/a Eversource Energy": 0.32862,
  "Massachusetts Electric d/b/a National Grid": 0.35795,
  ...
}
```

Original TopoJSON data
```
{
  "type": "Topology",
  "bbox": [
    ...
  ],
  "transform": {
    ...
  },
  "objects": {
    "towns": {
      ...
    },
    "regions": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "MultiPolygon",
          "arcs": [
            ...
          ],
          "id": "WMECo d/b/a Eversource Energy",
          "properties": {
            "ELEC_LABEL": "WMECo d/b/a Eversource Energy"
          }
        },
        {
          "type": "MultiPolygon",
          "arcs": [
            ...
          ],
          "id": "Massachusetts Electric d/b/a National Grid",
          "properties": {
            "ELEC_LABEL": "Massachusetts Electric d/b/a National Grid"
          }
        },
        ...
      ]
    }
  }
}
```

Desired result
```diff
{
  ...
  "objects": {
    ...
    "regions": {
      ...
      "geometries": [
        {
          ...
          "properties": {
            "ELEC_LABEL": "WMECo d/b/a Eversource Energy",
+            "SMART": 0.32862
          }
        },
        {
          ...
          "properties": {
            "ELEC_LABEL": "Massachusetts Electric d/b/a National Grid",
+            "SMART": 0.35795
          }
        },
        ...
      ]
    }
  }
}
```
```json
{
  "type": "Topology",
    "bbox": [
    ],
    "transform": {
    },
    "objects": {
      "towns": {
      },
      "regions": {
        "type": "GeometryCollection",
        "geometries": [
        {
          "type": "MultiPolygon",
          "arcs": [
            ],
            "id": "WMECo d/b/a Eversource Energy",
            "properties": {
              "ELEC": "WMECo d/b/a Eversource Energy",
              "ELEC_LABEL": "WMECo d/b/a Eversource Energy"
            }
        },
        {
        },
        {
        },
        {
        }, ] } } }
```
