const UPDATE_NAME_NEW = "UPDATE-NAME-NEW";
const UPDATE_URL_NEW = "UPDATE-URL-NEW";
const UPDATE_VK_NEW = "UPDATE-VK-NEW";
const UPDATE_TG_NEW = "UPDATE-TG-NEW";
const UPDATE_YOUTUBE_NEW = "UPDATE-YOUTUBE-NEW";
const UPDATE_OK_NEW = "UPDATE-OK-NEW";
const UPDATE_INST_NEW = "UPDATE-INST-NEW";
const UPDATE_TW_NEW = "UPDATE-TW-NEW";
const SET_ERROR = "SET-ERROR";
const UPDATE_NAME_EXIST = "UPDATE-NAME-EXIST";
const UPDATE_URL_EXIST = "UPDATE-URL-EXIST";
const UPDATE_VK_EXIST = "UPDATE-VK-EXIST";
const UPDATE_TG_EXIST = "UPDATE-TG-EXIST";
const UPDATE_YOUTUBE_EXIST = "UPDATE-YOUTUBE-EXIST";
const UPDATE_OK_EXIST = "UPDATE-OK-EXIST";
const UPDATE_INST_EXIST = "UPDATE-INST-EXIST";
const UPDATE_TW_EXIST = "UPDATE-TW-EXIST";

const SET_RESOURCES = "SET-RESOURCES";
const SET_DATA = "SET-DATA";

const initialState = {
  resources: [
    {
      fields: {
        id: 0,
        name: "",
        url: "",
        vk: "",
        tg: "",
        youtube: "",
        ok: "",
        inst: "",
        tw: "",
      },
      data: [
        {
          date: "",
          dayViews: null,
          dayVisitors: null,
          weekViews: null,
          weekVisitors: null,
          monthViews: null,
          monthVisitors: null,
          vk: null,
          tg: null,
          youtubeSubs: null,
          youtubeViews: null,
          ok: null,
          inst: null,
          tw: null,
        },
      ],
    },
  ],
  new: {
    name: "",
    url: "",
    vk: "",
    tg: "",
    youtube: "",
    ok: "",
    inst: "",
    tw: "",
    error: "",
  },
};

const parseReducer = (prevState = initialState, action) => {
  let state = { ...prevState };

  switch (action.type) {
    case UPDATE_NAME_NEW:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          name: action.name,
        },
      };
      return state;

    case UPDATE_URL_NEW:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          url: action.url,
        },
      };
      return state;

    case UPDATE_VK_NEW:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          vk: action.vk,
        },
      };
      return state;

    case UPDATE_TG_NEW:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          tg: action.tg,
        },
      };
      return state;

    case UPDATE_YOUTUBE_NEW:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          youtube: action.youtube,
        },
      };
      return state;

    case UPDATE_OK_NEW:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          ok: action.ok,
        },
      };
      return state;

    case UPDATE_INST_NEW:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          inst: action.inst,
        },
      };
      return state;

    case UPDATE_TW_NEW:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          tw: action.tw,
        },
      };
      return state;

    case SET_ERROR:
      state = {
        ...prevState,
        new: {
          ...prevState.new,
          error: action.error,
        },
      };
      return state;

    case UPDATE_NAME_EXIST:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) =>
          resource.fields.id === action.id
            ? {
                data: resource.data,
                fields: { ...resource.fields, name: action.name },
              }
            : {
                data: resource.data,
                fields: resource.fields,
              }
        ),
      };
      return state;

    case UPDATE_URL_EXIST:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) =>
          resource.fields.id === action.id
            ? {
                data: resource.data,
                fields: { ...resource.fields, url: action.url },
              }
            : {
                data: resource.data,
                fields: resource.fields,
              }
        ),
      };
      return state;

    case UPDATE_VK_EXIST:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) =>
          resource.fields.id === action.id
            ? {
                data: resource.data,
                fields: { ...resource.fields, vk: action.vk },
              }
            : {
                data: resource.data,
                fields: resource.fields,
              }
        ),
      };
      return state;

    case UPDATE_TG_EXIST:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) =>
          resource.fields.id === action.id
            ? {
                data: resource.data,
                fields: { ...resource.fields, tg: action.tg },
              }
            : {
                data: resource.data,
                fields: resource.fields,
              }
        ),
      };
      return state;

    case UPDATE_YOUTUBE_EXIST:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) =>
          resource.fields.id === action.id
            ? {
                data: resource.data,
                fields: { ...resource.fields, youtube: action.youtube },
              }
            : {
                data: resource.data,
                fields: resource.fields,
              }
        ),
      };
      return state;

    case UPDATE_OK_EXIST:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) =>
          resource.fields.id === action.id
            ? {
                data: resource.data,
                fields: { ...resource.fields, ok: action.ok },
              }
            : {
                data: resource.data,
                fields: resource.fields,
              }
        ),
      };
      return state;

    case UPDATE_INST_EXIST:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) =>
          resource.fields.id === action.id
            ? {
                data: resource.data,
                fields: { ...resource.fields, inst: action.inst },
              }
            : {
                data: resource.data,
                fields: resource.fields,
              }
        ),
      };
      return state;

    case UPDATE_TW_EXIST:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) =>
          resource.fields.id === action.id
            ? {
                data: resource.data,
                fields: { ...resource.fields, tw: action.tw },
              }
            : {
                data: resource.data,
                fields: resource.fields,
              }
        ),
      };
      return state;

    case SET_RESOURCES:
      state = {
        ...prevState,
        resources: action.resources.map((resource) => ({
          fields: { ...resource },
          data: [
            {
              date: "",
              dayViews: null,
              dayVisitors: null,
              weekViews: null,
              weekVisitors: null,
              monthViews: null,
              monthVisitors: null,
              vk: null,
              tg: null,
              youtubeSubs: null,
              youtubeViews: null,
              ok: null,
              inst: null,
              tw: null,
            },
          ],
        })),
      };
      return state;

    case SET_DATA:
      state = {
        ...prevState,
        resources: prevState.resources.map((resource) => ({
          fields: resource.fields,
          data: action.data.map((dataResources) =>
            dataResources.data.filter((data) => data.id === resource.id)
          ),
        })),
      };
      return state;

    default:
      return state;
  }
};

export default parseReducer;

export const updateNameNewAC = (name = "") => ({ type: UPDATE_NAME_NEW, name });
export const updateUrlNewAC = (url = "") => ({ type: UPDATE_URL_NEW, url });
export const updateVkNewAC = (vk = "") => ({ type: UPDATE_VK_NEW, vk });
export const updateTgNewAC = (tg = "") => ({ type: UPDATE_TG_NEW, tg });
export const updateYoutubeNewAC = (youtube = "") => ({
  type: UPDATE_YOUTUBE_NEW,
  youtube,
});
export const updateOkNewAC = (ok = "") => ({ type: UPDATE_OK_NEW, ok });
export const updateInstNewAC = (inst = "") => ({ type: UPDATE_INST_NEW, inst });
export const updateTwNewAC = (tw = "") => ({ type: UPDATE_TW_NEW, tw });
export const setErrorAC = (error = "") => ({ type: SET_ERROR, error });

export const updateNameExistAC = (id, name = "") => ({
  type: UPDATE_NAME_EXIST,
  id,
  name,
});
export const updateUrlExistAC = (id, url = "") => ({
  type: UPDATE_URL_EXIST,
  id,
  url,
});
export const updateVkExistAC = (id, vk = "") => ({
  type: UPDATE_VK_EXIST,
  id,
  vk,
});
export const updateTgExistAC = (id, tg = "") => ({
  type: UPDATE_TG_EXIST,
  id,
  tg,
});
export const updateYoutubeExistAC = (id, youtube = "") => ({
  type: UPDATE_YOUTUBE_EXIST,
  id,
  youtube,
});
export const updateOkExistAC = (id, ok = "") => ({
  type: UPDATE_OK_EXIST,
  id,
  ok,
});
export const updateInstExistAC = (id, inst = "") => ({
  type: UPDATE_INST_EXIST,
  id,
  inst,
});
export const updateTwExistAC = (id, tw = "") => ({
  type: UPDATE_TW_EXIST,
  id,
  tw,
});

export const setResources = (resources) => ({ type: SET_RESOURCES, resources });
export const setData = (data) => ({ type: SET_DATA, data });
