/* eslint-disable @typescript-eslint/no-unused-vars */
// import ReactNativeBlobUtil from "react-native-blob-util";
import { fetchGameDownloads } from "../api/itchio-service";

// const FETCH_LIMIT = 6291456;
// const PATH_TO_THE_FILE = "C:\\Users\\pc\\Downloads\\sync";

export async function getGameDownloads(game, authorization) {
  const { download_key_id, id } = game;
  const response = await fetchGameDownloads(download_key_id, id, authorization);
  const result = await response.json();
  return result;
}

export async function downloadGame(game, authorization) {
  const { download_key_id, id } = game;
  const {
    uploads: [upload],
  } = await getGameDownloads(
    {
      download_key_id,
      id,
    },
    authorization,
  );
  const uuid = await fetchDownloadSession(download_key_id, authorization);
  const session = await fetch(
    `https://api.itch.io/uploads/${upload.id}/download?api_key=${authorization}&download_key_id=${download_key_id}&uuid=${uuid}`,
    {
      headers: {
        authorization,
      },
    },
  );

  // REPLACE WITH https://github.com/joltup/rn-fetch-blob#download-example-fetch-files-that-need-authorization-token
  /* if (upload.size < FETCH_LIMIT) {
    ReactNativeBlobUtil.config({
      session: upload.filename,
      fileCache: true,
    })
      .fetch("GET", session.url, {
        authorization,
      })
      .progress((received, total) => {
        console.log("progress", received / total);
      })
      .then(res => {
        let status = res.info().status;
        console.log(res.info().status);
        if (status == 200) {
          console.log("OK File downloaded");
          // the conversion is done in native code
          // remove cached file from storage
          res.flush();
        } else {
          // handle other status codes
        }
      })
      .catch((errorMessage) => {
        // error handling
        console.table(errorMessage);
      });
  } */
  /* let data = "";

  ReactNativeBlobUtil.fs.isDir(PATH_TO_THE_FILE).then(isDir => {
    console.log(`file is ${isDir ? "" : "not"} a directory`);
  }); */
}

const fetchDownloadSession = async (download_key_id, authorization) => {
  let response = await fetch(
    `https://api.itch.io/games/${download_key_id}/download-sessions`,
    {
      method: "POST",
      headers: {
        authorization,
      },
    },
  );
  response = await response.json();
  return response.uuid;
};
