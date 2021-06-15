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

  const updateNameNewResource = (name) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        name: name.target.value,
      },
    }));
  const updateUrlNewResource = (url) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        url: url.target.value,
      },
    }));
  const updateVkNewResource = (vk) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        vk: vk.target.value,
      },
    }));
  const updateTgNewResource = (tg) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        tg: tg.target.value,
      },
    }));
  const updateYouTubeNewResource = (youTube) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        youTube: youTube.target.value,
      },
    }));
  const updateOkNewResource = (ok) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        ok: ok.target.value,
      },
    }));
  const updateInstNewResource = (inst) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        inst: inst.target.value,
      },
    }));
  const updateTwNewResource = (tw) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        tw: tw.target.value,
      },
    }));
  const setErrorNewResource = (error) =>
    setResources((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        error: error,
      },
    }));
  console.log(resources);
  return (
    <ResourcesPresentation
      resources={resources.savedResources}
      newResource={resources.newResource}
      updateNameNewResource={updateNameNewResource}
      updateUrlNewResource={updateUrlNewResource}
      updateVkNewResource={updateVkNewResource}
      updateTgNewResource={updateTgNewResource}
      updateYouTubeNewResource={updateYouTubeNewResource}
      updateOkNewResource={updateOkNewResource}
      updateInstNewResource={updateInstNewResource}
      updateTwNewResource={updateTwNewResource}
    />
  );
};
