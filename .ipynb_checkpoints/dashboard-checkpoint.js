finalSpec={
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {"url": "https://gentle-wildwood-29943.herokuapp.com/meteors/2000"},
  "transform": [
    {"filter": "datum.altitude >= -500"},
    {"window": [{"op": "row_number", "as": "row_number"}]}
  ],
  "background": null,
  "hconcat": [
    {
      "vconcat": [
        {
          "title": {
            "text": "Meteorite Landings By Year",
            "fontSize": 20,
            "color": "gray",
            "subtitle": "(Hold shift key + mouse to pan the plot)",
            "subtitleColor": "gray"
          },
          "width": 200,
          "transform": [
            {"filter": "datum.date != null"},
            {"filter": {"field": "date", "timeUnit": "year", "gt": 100}}
          ],
          "selection": {
            "zoom": {
              "type": "interval",
              "bind": "scales",
              "on": "[mousedown[event.shiftKey], mouseup] > mousemove",
              "translate": "[mousedown[event.shiftKey], mouseup] > mousemove!"
            },
            "brush": {
              "type": "interval",
              "encodings": ["x", "y"],
              "on": "[mousedown[!event.shiftKey], mouseup] > mousemove",
              "translate": "[mousedown[!event.shiftKey], mouseup] > mousemove!"
            }
          },
          "mark": "point",
          "encoding": {
            "x": {
              "field": "date",
              "timeUnit": "year",
              "type": "temporal",
              "title": "Year"
            },
            "y": {
              "field": "mass",
              "type": "quantitative",
              "title": "Mass",
              "scale": {"domain": [-2000, 100000]}
            },
            "color": {
              "condition": {
                "param": "brush",
                "field": "altitude",
                "type": "quantitative",
                "legend": null,
                "scale": {
                  "range": [
                    "#762a83",
                    "#9970ab",
                    "#c2a5cf",
                    "#e7d4e8",
                    "#f7f7f7",
                    "#d9f0d3",
                    "#a6dba0",
                    "#5aae61",
                    "#1b7837"
                  ]
                }
              },
              "value": "grey"
            },
            "shape": {"field": "fall", "type": "nominal"}
          }
        },
        {
          "title": {
            "text": "Meteorite Landings By Year (Zoom)",
            "fontSize": 20,
            "color": "gray"
          },
          "width": 200,
          "transform": [
            {"filter": "datum.date != null"},
            {"filter": {"field": "date", "timeUnit": "year", "gt": 100}}
          ],
          "mark": "point",
          "encoding": {
            "x": {
              "field": "date",
              "timeUnit": "year",
              "type": "temporal",
              "title": "Year",
              "scale": {"domain": {"selection": "brush", "encoding": "x"}}
            },
            "y": {
              "field": "mass",
              "type": "quantitative",
              "title": "Mass",
              "scale": {"domain": {"selection": "brush", "encoding": "y"}}
            },
            "tooltip": [
              {"field": "name", "type": "ordinal"},
              {
                "field": "date",
                "timeUnit": "year",
                "type": "temporal",
                "title": "Year"
              },
              {"field": "mass", "type": "quantitative", "title": "Mass(g)"}
            ],
            "color": {
              "condition": {
                "param": "brush",
                "field": "altitude",
                "type": "quantitative",
                "legend": null,
                "scale": {
                  "range": [
                    "#762a83",
                    "#9970ab",
                    "#c2a5cf",
                    "#e7d4e8",
                    "#f7f7f7",
                    "#d9f0d3",
                    "#a6dba0",
                    "#5aae61",
                    "#1b7837"
                  ]
                }
              },
              "value": "grey"
            },
            "shape": {"field": "fall", "type": "nominal"}
          }
        }
      ]
    },
    {
      "vconcat": [
        {
          "title": {
            "text": "Meteorite Landings on Map",
            "fontSize": 20,
            "color": "gray"
          },
          "projection": {"type": "equalEarth"},
          "width": 500,
          "height": 250,
          "layer": [
            {
              "data": {
                "name": "world",
                "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/world-110m.json",
                "format": {"type": "topojson", "feature": "countries"}
              },
              "mark": {"type": "geoshape", "fill": "grey", "stroke": "white"}
            },
            {
              "transform": [
                {"filter": {"param": "brush"}},
                {"filter": {"field": "reclong", "valid": true}},
                {"filter": {"field": "reclat", "valid": true}}
              ],
              "params": [
                {
                  "name": "paintbrush",
                  "select": {
                    "type": "point",
                    "on": "mouseover",
                    "nearest": true
                  }
                }
              ],
              "mark": {"type": "point", "filled": true, "opacity": 0.6},
              "encoding": {
                "longitude": {"field": "reclong", "type": "quantitative"},
                "latitude": {"field": "reclat", "type": "quantitative"},
                "tooltip": [
                  {"field": "country", "type": "ordinal", "title": "Country"},
                  {"field": "name", "type": "ordinal", "title": "Name"},
                  {
                    "field": "altitude",
                    "type": "quantitative",
                    "format": ".3f",
                    "title": "Altitude"
                  },
                  {"field": "fall", "type": "nominal"},
                  {"field": "recclass", "type": "nominal"},
                  {
                    "field": "date",
                    "timeUnit": "year",
                    "type": "temporal",
                    "title": "Year"
                  },
                  {"field": "mass", "type": "quantitative", "title": "Mass(g)"}
                ],
                "size": {
                  "field": "mass",
                  "type": "quantitative",
                  "scale": {"rangeMax": 1000},
                  "legend": null
                },
                "color": {
                  "field": "altitude",
                  "type": "quantitative",
                  "title": "Altitude",
                  "scale": {
                    "range": [
                      "#762a83",
                      "#9970ab",
                      "#c2a5cf",
                      "#e7d4e8",
                      "#f7f7f7",
                      "#d9f0d3",
                      "#a6dba0",
                      "#5aae61",
                      "#1b7837"
                    ]
                  },
                  "condition": {"param": "paintbrush", "value": "red"}
                },
                "shape": {"field": "fall", "type": "nominal", "legend": null}
              }
            }
          ]
        },
        {
          "title": {
            "text": "Top Countries By Number of Meteorites",
            "fontSize": 20,
            "color": "gray"
          },
          "mark": "bar",
          "width": 500,
          "height": 250,
          "transform": [
            {"filter": {"param": "brush"}},
            {"filter": "datum.country != null"},
            {
              "aggregate": [
                {"op": "count", "field": "country", "as": "country_count"}
              ],
              "groupby": ["country"]
            },
            {
              "window": [{"op": "rank", "field": "", "as": "tag_rank"}],
              "sort": [{"field": "country_count", "order": "descending"}]
            },
            {"filter": "datum.tag_rank <= 5"}
          ],
          "encoding": {
            "y": {
              "field": "country",
              "type": "nominal",
              "title": "Country",
              "sort": {"field": "tag_rank", "order": "ascending"}
            },
            "x": {"field": "country_count", "type": "quantitative", "title":"Count"},
            "color":{"value":"#ffb700"}
          }
        }
      ]
    },
    {
      "vconcat": [
        {
          "title": {
            "text": "Altitude Histogram",
            "fontSize": 20,
            "color": "gray"
          },
          "transform": [{"filter": {"param": "brush"}}],
          "width": 200,
          "mark": "bar",
          "encoding": {
            "x": {"bin": {"maxbins": 100}, "field": "altitude", "title":"Altitude"},
            "y": {"aggregate": "count"},
            "color":{"value":"#ef476f"}
          }
        },
        {
          "title": {"text": "Count By Year", "fontSize": 20, "color": "gray"},
          "transform": [
            {"filter": {"param": "brush"}},
            {"filter": "datum.date != null"},
            {"filter": {"field": "date", "timeUnit": "year", "gt": 100}}
          ],
          "width": 200,
          "mark": "line",
          "encoding": {
            "x": {
              "field": "date",
              "timeUnit": "year",
              "type": "temporal",
              "title": "Year"
            },
            "y": {
              "field": "row_number",
              "type": "nominal",
              "aggregate": "count",
              "title": "Total number of meteorites(sum)"
            },
            "tooltip": [
              {
                "field": "row_number",
                "type": "quantitative",
                "title": "Amount of Meteorite",
                "aggregate": "count"
              }
            ],
            "color":{"value":"#1d3557 "}
          }
        }
      ]
    }
  ],
  "resolve": {"legend": {"color": "independent"}}
};
    vegaEmbed('#vis', finalSpec);
