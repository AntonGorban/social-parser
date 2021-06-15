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

  const saveNewResource = async () => {
    await api.resource.create(resources.newResource);
    getResources();
  };

  const updateNameSavedResource = (id, name) =>
    setResources((prev) => ({
      ...prev,
      savedResources: prev.savedResources.map((resource) => ({
        ...resource,
        name: resource.id === id ? name.target.value : resource.name,
      })),
    }));
  const updateUrlSavedResource = (id, url) =>
    setResources((prev) => ({
      ...prev,
      savedResources: prev.savedResources.map((resource) => ({
        ...resource,
        url: resource.id === id ? url.target.value : resource.url,
      })),
    }));
  const updateVkSavedResource = (id, vk) =>
    setResources((prev) => ({
      ...prev,
      savedResources: prev.savedResources.map((resource) => ({
        ...resource,
        vk: resource.id === id ? vk.target.value : resource.vk,
      })),
    }));
  const updateTgSavedResource = (id, tg) =>
    setResources((prev) => ({
      ...prev,
      savedResources: prev.savedResources.map((resource) => ({
        ...resource,
        tg: resource.id === id ? tg.target.value : resource.tg,
      })),
    }));
  const updateYouTubeSavedResource = (id, youTube) =>
    setResources((prev) => ({
      ...prev,
      savedResources: prev.savedResources.map((resource) => ({
        ...resource,
        youTube: resource.id === id ? youTube.target.value : resource.youTube,
      })),
    }));
  const updateOkSavedResource = (id, ok) =>
    setResources((prev) => ({
      ...prev,
      savedResources: prev.savedResources.map((resource) => ({
        ...resource,
        ok: resource.id === id ? ok.target.value : resource.ok,
      })),
    }));
  const updateInstSavedResource = (id, inst) =>
    setResources((prev) => ({
      ...prev,
      savedResources: prev.savedResources.map((resource) => ({
        ...resource,
        inst: resource.id === id ? inst.target.value : resource.inst,
      })),
    }));
  const updateTwSavedResource = (id, tw) =>
    setResources((prev) => ({
      ...prev,
      savedResources: prev.savedResources.map((resource) => ({
        ...resource,
        tw: resource.id === id ? tw.target.value : resource.tw,
      })),
    }));

  const updateSavedResource = async (id) => {
    await api.resource
      .update(
        id,
        ...resources.savedResources.filter((resource) => id === resource.id)
      )
      .catch((error) => console.error(error));
    getResources();
  };

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
      saveNewResource={saveNewResource}
      updateNameSavedResource={updateNameSavedResource}
      updateUrlSavedResource={updateUrlSavedResource}
      updateVkSavedResource={updateVkSavedResource}
      updateTgSavedResource={updateTgSavedResource}
      updateYouTubeSavedResource={updateYouTubeSavedResource}
      updateOkSavedResource={updateOkSavedResource}
      updateInstSavedResource={updateInstSavedResource}
      updateTwSavedResource={updateTwSavedResource}
      updateSavedResource={updateSavedResource}
    />
  );
};
