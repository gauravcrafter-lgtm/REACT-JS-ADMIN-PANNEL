let cache = null;

export async function loadAgencyConfig() {
  if (cache) return cache;

  const res = await fetch("/web.config", { cache: "no-store" });
  if (!res.ok) throw new Error("web.config load failed: " + res.status);

  const xml = new DOMParser().parseFromString(await res.text(), "text/xml");
  const get = (key) =>
    xml.querySelector(`appSettings > add[key="${key}"]`)?.getAttribute("value") || "";

  cache = {
AgencyKey: get("AgencyKey"),
PortalId: get("PortalId"),
AccountNo: get("AccountNo"),
AdminKey: get("AdminKey"),
};
  return cache;
}