type GithubWriteFileParams = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  path: string; // repo path
  contentBase64: string;
  message: string;
};

async function gh<T>(url: string, init: RequestInit, token: string): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }
  return text ? (JSON.parse(text) as T) : ({} as T);
}

export async function githubGetFileSha(opts: {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  path: string;
}) {
  const url = `https://api.github.com/repos/${opts.owner}/${opts.repo}/contents/${encodeURIComponent(opts.path).replaceAll("%2F", "/")}?ref=${encodeURIComponent(opts.branch)}`;
  const data = await gh<{ sha: string }>(url, { method: "GET" }, opts.token);
  return data.sha;
}

export async function githubWriteFile(p: GithubWriteFileParams & { sha?: string }) {
  const url = `https://api.github.com/repos/${p.owner}/${p.repo}/contents/${encodeURIComponent(p.path).replaceAll("%2F", "/")}`;
  const body = {
    message: p.message,
    content: p.contentBase64,
    branch: p.branch,
    ...(p.sha ? { sha: p.sha } : {}),
  };

  return gh(url, { method: "PUT", body: JSON.stringify(body) }, p.token);
}
