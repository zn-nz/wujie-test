const map = {
	"//localhost:2001": "//101.43.237.216:8002",
	"//localhost:2002": "//101.43.237.216:8003",
	"//localhost:2003": "//101.43.237.216:8004",
	"//localhost:2004": "//101.43.237.216:8005"
};

export default function hostMap(host) {
	if (process.env.NODE_ENV === "production") return map[host];
	return host;
}
