import re
import json
import os

from urllib.parse import unquote
from io import BytesIO

from requests_futures.sessions import FuturesSession
from PIL import Image

ASSET_PATH = "public"
DATA_PATH = "assets"
os.makedirs(ASSET_PATH, exist_ok=True)

s = FuturesSession()

s.get("https://game.granbluefantasy.jp/tutorial/content/index/2/1").result()

r = s.post(
    "https://game.granbluefantasy.jp/setting/language_save",
    json={"language_type": "2", "special_token": "null"},
).result()


game_ver = re.search(r'"version": "[0-9]*",', r.text)
X_VERSION = game_ver.group(0)[12:-2]
HEADERS = {"X-VERSION": X_VERSION, "X-Requested-With": "XMLHttpRequest"}

r = s.get("https://game.granbluefantasy.jp/gacha/list", headers=HEADERS).result()
GACHA_ID = r.json()["appearance_gacha_id"]

DATA_FILE_PATH = os.path.join(DATA_PATH, "data.json")
if os.path.exists(DATA_FILE_PATH):
    with open(DATA_FILE_PATH, "r") as f:
        data = json.load(f)
else:
    data = {}


def get_chara_data(data):
    rs = []
    latest_chara = data.get("latest_chara", 565)
    id_ = 0
    chara_list = data.get("chara_list", [])
    while id_ < latest_chara + 20:
        id_ += 1
        if next((chara for chara in chara_list if chara.get("gacha_id") == id_), None):
            latest_chara = max(latest_chara, id_)
            continue
        rs.append(
            s.get(
                f"https://game.granbluefantasy.jp/gacha/content/chara/legend/{GACHA_ID}/{id_}",
                headers=HEADERS,
            )
        )

    for r in rs:
        try:
            r = r.result()
            chara_data = unquote(r.json()["data"])
            chara_gacha_id = int(r.url.split("/")[-1])
            chara_id = re.search(r'data-image-id="[0-9,_]*"', chara_data).group(0)[
                15:-4
            ]
            if not chara_id.startswith("304"):
                continue
            chara_name = re.search(
                r'prt-rarity-4">.*</div><div class="prt-c', chara_data
            ).group(0)[14:-23]
            chara_weapon = re.search(r'txt-weapon-name">.*</div', chara_data).group(0)[
                17:-5
            ]
            chara_list.append(
                {
                    "gacha_id": chara_gacha_id,
                    "id": chara_id,
                    "name": chara_name,
                    "weapon": chara_weapon,
                }
            )
            latest_chara = max(latest_chara, chara_gacha_id)
            print(f"Found {chara_id} {chara_name} {chara_weapon}")
        except Exception as e:
            pass
    chara_list = sorted(chara_list, key=lambda d: d["gacha_id"], reverse=True)
    return (latest_chara, chara_list)


def get_summon_data(data):
    r = s.get(
        f"https://game.granbluefantasy.jp/gacha/provision_ratio/legend/{GACHA_ID}/1",
        headers=HEADERS,
    ).result()

    summon_list = data.get("summon_list", [])
    for summon_data in r.json()["appear"][1]["item"]:
        summon_list.append(
            {
                "id": str(summon_data["reward_id"]),
                "name": summon_data["name"],
            }
        )
    summon_list = list({v["id"]: v for v in summon_list}.values())  # remove dupes
    summon_list = sorted(summon_list, key=lambda d: d["id"], reverse=True)
    return summon_list


latest_chara_gacha_id, chara_list = get_chara_data(data)
summon_list = get_summon_data(data)

data = {
    "x-version": X_VERSION,
    "gacha_id": GACHA_ID,
    "latest_chara": latest_chara_gacha_id,
    "chara_list": chara_list,
    "summon_list": summon_list,
}
with open(DATA_FILE_PATH, "w") as f:
    f.write(json.dumps(data, indent=4))


def download_image(url, path):
    if not os.path.exists(path):
        r = s.get(url).result()
        if r.ok:
            img = Image.open(BytesIO(r.content)).convert("RGB")
            img.save(path, optimize=True)
            print(f"DL {path}")


chara_thumb_path = os.path.join(ASSET_PATH, "char_thumb")
chara_thumb_low_path = os.path.join(ASSET_PATH, "char_thumb_low")
os.makedirs(chara_thumb_path, exist_ok=True)
os.makedirs(chara_thumb_low_path, exist_ok=True)
for chara in chara_list:
    id_ = chara["id"]
    save_path = os.path.join(chara_thumb_path, f"{id_}_01.webp")
    sd_save_path = os.path.join(chara_thumb_low_path, f"{id_}_01.webp")
    download_image(
        f"https://game.granbluefantasy.jp/assets/img/sp/assets/npc/m/{id_}_01.jpg",
        save_path,
    )
    download_image(
        f"https://game.granbluefantasy.jp/assets/img_low/sp/assets/npc/m/{id_}_01.jpg",
        sd_save_path,
    )


summon_thumb_path = os.path.join(ASSET_PATH, "summ_thumb")
summon_thumb_low_path = os.path.join(ASSET_PATH, "summ_thumb_low")
os.makedirs(summon_thumb_path, exist_ok=True)
os.makedirs(summon_thumb_low_path, exist_ok=True)
for summon in summon_list:
    id_ = summon["id"]
    save_path = os.path.join(summon_thumb_path, f"{id_}.webp")
    sd_save_path = os.path.join(summon_thumb_low_path, f"{id_}.webp")
    download_image(
        f"https://game.granbluefantasy.jp/assets/img/sp/assets/summon/m/{id_}.jpg",
        save_path,
    )
    download_image(
        f"https://game.granbluefantasy.jp/assets/img_low/sp/assets/summon/m/{id_}.jpg",
        sd_save_path,
    )
