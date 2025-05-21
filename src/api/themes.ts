import { ApiClient } from "@/utils/httpClient";

const client = ApiClient({
  baseURL: "/api/",
  withCredentials: false,
});

export const fetchThemes = async ({
  search,
  ordering,
  page,
  academic_year,
  academic_program,
  specialty,
  proposed_by,
  next_url,
  page_size,
  co_supervised_by,
  is_verified,
  is_member,
}: {
  search?: string;
  ordering?: string;
  page?: number;
  academic_year?: number;
  academic_program?: string;
  specialty?: string;
  proposed_by?: number;
  next_url?: string;
  page_size?: number;
  co_supervised_by?:number;
  is_verified?: boolean;
  is_member?:boolean;

}) => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // If next_url is provided, use it directly for pagination
  if (next_url) {
    const response = await client.get(next_url, { headers });
    return response;
  }

  // Otherwise, construct query parameters
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (academic_year) params.append("academic_year", academic_year.toString());
  if (academic_program) params.append("academic_program", academic_program);
  if (specialty) params.append("specialty", specialty);
  if (proposed_by) params.append("proposed_by", proposed_by.toString());
  if (page_size) params.append("page_size", page_size.toString());
  if (co_supervised_by) params.append("co_supervised_by", co_supervised_by.toString());
  if (is_verified !== undefined) params.append("is_verified", String(is_verified));
  if (is_member !== undefined) params.append("is_member", String(is_member));

  const response = await client.get(`themes/?${params.toString()}`, {
    headers,
  });
  return response;
};

export const createTheme = async ({
  title,
  co_supervisor_ids,
  specialty,
  description,
  tools,
  academic_year,
  academic_program,
  document_ids = [],
}: {
  title: string;
  co_supervisor_ids?: number[];
  specialty: string;
  description: string;
  tools: string;
  academic_year: number;
  academic_program: string;
  document_ids?: number[];
}) => {
  const token = localStorage.getItem("access_token");
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  const payload = {
    title,
    ...(co_supervisor_ids && co_supervisor_ids.length > 0 && { co_supervisor_ids }),
    specialty,
    description,
    tools,
    academic_year,
    academic_program,
    ...(document_ids && document_ids.length > 0 && { document_ids }),
  };

  const response = await client.post("themes/", payload, { headers });
  return response;
};

export const deleteTheme = async (id: number) => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { 
    Authorization: `Bearer ${token}` 
  } : {};

  const response = await client.delete(`themes/${id}/`, { headers });
  return response;
};

export const updateTheme = async (
  id: number,
  {
    title,
    co_supervisor_ids,
    specialty,
    description,
    tools,
    academic_year,
    academic_program,
    document_ids = [],
  }: {
    title: string;
    co_supervisor_ids?: number[];
    specialty: string;
    description: string;
    tools: string;
    academic_year: number;
    academic_program: string;
    document_ids?: number[];
  }
) => {
  const token = localStorage.getItem("access_token");
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {};

  const payload = {
    title,
    ...(co_supervisor_ids && { co_supervisor_ids}),
    specialty,
    description,
    tools,
    academic_year,
    academic_program,
    ...(document_ids  && { document_ids }),
  };

  const response = await client.patch(`themes/${id}/`, payload, { headers });
  return response;
};
