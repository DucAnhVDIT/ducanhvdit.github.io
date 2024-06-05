import React, { useEffect, useState, useRef } from "react";
import EmailEditor, { EditorRef } from "react-email-editor";

interface Template {
  id: number;
  name: string;
  json: object; // Update the type according to your template JSON structure
  thumbnail: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Limited Time Offer",
    json: {
      counters: {
        u_column: 2,
        u_row: 2,
        u_content_text: 1,
        u_content_heading: 1,
        u_content_image: 1,
        u_content_button: 1,
      },
      body: {
        id: "AbjfhS_HbC",
        rows: [
          {
            id: "eBnKZOtER5",
            cells: [1],
            columns: [
              {
                id: "_qssvSCun3",
                contents: [
                  {
                    id: "VYf6hZgUE8",
                    type: "heading",
                    values: {
                      containerPadding: "10px",
                      anchor: "",
                      headingType: "h1",
                      fontSize: "22px",
                      textAlign: "center",
                      lineHeight: "140%",
                      linkStyle: {
                        inherit: true,
                        linkColor: "#0000ee",
                        linkHoverColor: "#0000ee",
                        linkUnderline: true,
                        linkHoverUnderline: true,
                      },
                      displayCondition: null,
                      _meta: {
                        htmlID: "u_content_heading_1",
                        htmlClassNames: "u_content_heading",
                      },
                      selectable: true,
                      draggable: true,
                      duplicatable: true,
                      deletable: true,
                      hideable: true,
                      text: "<span>Limited Time Offer Only !!</span>",
                    },
                  },
                  {
                    id: "o4wRveR5ib",
                    type: "image",
                    values: {
                      containerPadding: "10px",
                      anchor: "",
                      src: {
                        url: "https://assets.unlayer.com/projects/236441/1717598191990-BirthdayImage.png",
                        width: 1748,
                        height: 1240,
                      },
                      textAlign: "center",
                      altText: "",
                      action: {
                        name: "web",
                        values: {
                          href: "",
                          target: "_blank",
                        },
                      },
                      displayCondition: null,
                      _meta: {
                        htmlID: "u_content_image_1",
                        htmlClassNames: "u_content_image",
                      },
                      selectable: true,
                      draggable: true,
                      duplicatable: true,
                      deletable: true,
                      hideable: true,
                    },
                  },
                  {
                    id: "FQ54xdC9tr",
                    type: "button",
                    values: {
                      containerPadding: "10px",
                      anchor: "",
                      href: {
                        name: "web",
                        values: {
                          href: "",
                          target: "_blank",
                        },
                      },
                      buttonColors: {
                        color: "#FFFFFF",
                        backgroundColor: "#3AAEE0",
                        hoverColor: "#FFFFFF",
                        hoverBackgroundColor: "#3AAEE0",
                      },
                      size: {
                        autoWidth: true,
                        width: "100%",
                      },
                      fontSize: "14px",
                      textAlign: "center",
                      lineHeight: "120%",
                      padding: "10px 20px",
                      border: {},
                      borderRadius: "4px",
                      displayCondition: null,
                      _meta: {
                        htmlID: "u_content_button_1",
                        htmlClassNames: "u_content_button",
                      },
                      selectable: true,
                      draggable: true,
                      duplicatable: true,
                      deletable: true,
                      hideable: true,
                      text: "Get Code",
                      calculatedWidth: 100,
                      calculatedHeight: 37,
                    },
                  },
                ],
                values: {
                  border: {},
                  padding: "0px",
                  backgroundColor: "",
                  _meta: {
                    htmlID: "u_column_1",
                    htmlClassNames: "u_column",
                  },
                },
              },
            ],
            values: {
              displayCondition: null,
              columns: false,
              backgroundColor: "",
              columnsBackgroundColor: "",
              backgroundImage: {
                url: "",
                fullWidth: true,
                repeat: "no-repeat",
                size: "custom",
                position: "center",
              },
              padding: "0px",
              anchor: "",
              hideDesktop: false,
              _meta: {
                htmlID: "u_row_1",
                htmlClassNames: "u_row",
              },
              selectable: true,
              draggable: true,
              duplicatable: true,
              deletable: true,
              hideable: true,
            },
          },
        ],
        headers: [],
        footers: [],
        values: {
          popupPosition: "center",
          popupWidth: "600px",
          popupHeight: "auto",
          borderRadius: "10px",
          contentAlign: "center",
          contentVerticalAlign: "center",
          contentWidth: "500px",
          fontFamily: {
            label: "Arial",
            value: "arial,helvetica,sans-serif",
          },
          textColor: "#000000",
          popupBackgroundColor: "#FFFFFF",
          popupBackgroundImage: {
            url: "",
            fullWidth: true,
            repeat: "no-repeat",
            size: "cover",
            position: "center",
          },
          popupOverlay_backgroundColor: "rgba(0, 0, 0, 0.1)",
          popupCloseButton_position: "top-right",
          popupCloseButton_backgroundColor: "#DDDDDD",
          popupCloseButton_iconColor: "#000000",
          popupCloseButton_borderRadius: "0px",
          popupCloseButton_margin: "0px",
          popupCloseButton_action: {
            name: "close_popup",
            attrs: {
              onClick:
                "document.querySelector('.u-popup-container').style.display = 'none';",
            },
          },
          backgroundColor: "#F9F9F9",
          preheaderText: "",
          linkStyle: {
            body: true,
            linkColor: "#0000ee",
            linkHoverColor: "#0000ee",
            linkUnderline: true,
            linkHoverUnderline: true,
          },
          backgroundImage: {
            url: "",
            fullWidth: true,
            repeat: "no-repeat",
            size: "custom",
            position: "center",
          },
          _meta: {
            htmlID: "u_body",
            htmlClassNames: "u_body",
          },
        },
      },
      schemaVersion: 16,
    },
    thumbnail:
      "https://assets.unlayer.com/projects/236441/1717598191990-BirthdayImage.png",
  },
  // Add more templates as needed
];

function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const emailEditorRef = useRef<EditorRef>(null);

  useEffect(() => {
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const onLoad = () => {
    if (selectedTemplate && emailEditorRef.current) {
      emailEditorRef.current.editor.loadDesign(selectedTemplate.json);
    }
  };

  const onReady = () => {
    console.log("Editor is ready");
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  if (selectedTemplate) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div style={{ width: "100%",}}>
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-4">Choose a template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border p-4 rounded-lg cursor-pointer hover:shadow-lg"
            onClick={() => handleTemplateSelect(template)}
          >
            <img
              src={template.thumbnail}
              alt={template.name}
              className="mb-2"
            />
            <h2 className="text-lg font-semibold">{template.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
