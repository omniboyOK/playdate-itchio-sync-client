import jsdom from "jsdom";
import {fileFromPath} from "formdata-node/file-from-path";
import {FormData} from "formdata-node";
import fetchCookie from "fetch-cookie";
import nodeFetch from "node-fetch";

const {JSDOM} = jsdom;

const fetch = fetchCookie(nodeFetch);

async function getCSRF(url) {
  const response = await fetch(url);
  const text = await response.text();

  const dom = new JSDOM(text);
  return dom.window.document
    .querySelector("input[name=\"csrfmiddlewaretoken\"]")
    .getAttribute("value");
}

export async function login(username, password) {
  const token = await getCSRF("https://play.date/signin/");

  const body = new URLSearchParams();
  body.append("csrfmiddlewaretoken", token);
  body.append("username", username);
  body.append("password", password);

  return fetch("https://play.date/signin/", {
    body: body.toString(),
    method: "POST",
    headers: {
      Referer: "https://play.date/signin/",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

/**
 * @description fetch playdate web account and scrap sideloaded games with version number
 *
 * @returns A list of sideloaded games on your playdate device
 */
export async function getSideloads() {
  const games = [];

  const response = await fetch("https://play.date/account/");
  const text = await response.text();

  const dom = new JSDOM(text);
  const children = dom.window.document.querySelector(".game-list").children;

  for (var i = 0; i < children.length; i++) {
    const child = children[i];
    const id = child
      .querySelector("a[class=\"action\"]")
      .getAttribute("href")
      .split("#")[1];
    const date = child
      .querySelector("dd[class=\"game-date\"]")
      .textContent.trim(); // todo: normalize this to ISO8061
    const title = child
      .querySelector("dd[class=\"game-title\"]")
      .textContent.trim();
    const version = child
      .querySelector("dd[class=\"game-version\"]")
      .textContent.trim();
    const game = {
      id,
      date,
      title,
      version,
    };
    games.push(game);
  }

  return games;
}

export async function uploadGame(path) {
  const token = await getCSRF("https://play.date/account/sideload/");

  const body = new FormData();
  body.set("csrfmiddlewaretoken", token);
  body.set("file", await fileFromPath(path));

  return fetch("https://play.date/account/sideload/", {
    method: "POST",
    body,
    headers: {
      Referer: "https://play.date/account/sideload/",
    },
  });
}
