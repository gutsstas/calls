export interface ICall {
  abuse: ICallAbuse[];
  contact_company: string;
  contact_name: string;
  date: string;
  date_notime: string;
  disconnect_reason: string;
  errors: string[];
  from_extension: string;
  from_number: string;
  from_site: number;
  id: number;
  in_out: number;
  is_skilla: number;
  line_number: string;
  partner_data: {
    id: string;
    name: string;
    phone: string;
  };
  partnership_id: string;
  person_avatar: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  record: string;
  results: ICallResult[];
  source: string;
  stages: ICallStage[];
  status: string;
  time: number;
  to_extension: string;
  to_number: string;
}

interface ICallResult {
  type: string;
  title: string;
  tooltip: string;
}

interface ICallStage {
  person_name: string;
  person_surname: string;
  person_mango_phone: string;
  duration: string;
  disconnect_reason: string;
}

// interface ICallError {
//   title: string;
// }

interface ICallAbuse {
  date: string;
  person_name: string;
  message: string;
  support_read_status: number;
  support_answer_status: number;
  answers: ICallAbuseAnswer[];
}

interface ICallAbuseAnswer {
  message: string;
  from_support: number;
  support_read_status: number;
  person_read_status: number;
}
