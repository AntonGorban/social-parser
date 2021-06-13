import React, { useState } from "react";
import api from "../../api/api";
import { ResourcesPresentation } from "./ResourcesPresentation";

export const Resources = () => {
  const [resources, setResources] = useState({
    savedResources: [
      {
        id: 0,
        name: "",
        url: "",
        vk: "",
        tg: "",
        youTube: "",
        ok: "",
        inst: "",
        tw: "",
        error: "",
      },
    ],
    recd: false,
    newResource: {
      name: "",
      url: "",
      vk: "",
      tg: "",
      youTube: "",
      ok: "",
      inst: "",
      tw: "",
      error: "",
    },
  });

  const getResources = async () => {
    const response = await api.resource.get();
    setResources((prev) => ({
      ...prev,
      recd: true,
      savedResources: response.data.map((resource) => ({
        id: resource.id,
        name: resource.name || "",
        url: resource.url || "",
        vk: resource.vk || "",
        tg: resource.tg || "",
        youTube: resource.youtube || "",
        ok: resource.ok || "",
        inst: resource.inst || "",
        tw: resource.tw || "",
        error: "",
      })),
    }));
  };

  if (!resources.recd) getResources();

  console.log(resources);
  return (
    <ResourcesPresentation
      resources={resources.savedResources}
      newResource={resources.newResource}
    />
  );
};
