import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "@/constants/api";
import { StateObject, TimeState } from "@/types";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
});

interface CourseI {
  id: string;
  course_no: number;
  course_title: string;
  course_img: string;
  created_at: string;
}

export interface CoursesI {
  courses: CourseI[];
  total: number;
  totalPages: number;
}

export interface FileI {
  id: string;
  file_name: string;
  content: string;
  state: StateObject;
}

export interface FilesI {
  files: FileI[];
}

interface UnitI {
  id: string;
  unit_no: number;
  unit_title: string;
}

export interface UnitsI {
  units: UnitI[];
  total: number;
  totalPages: number;
}

interface LessonI {
  id: string;
  file_no: number;
  file_name: string;
  file_audio: string;
  content: string;
  state: StateObject;
  timestamp: TimeState;
}

export interface LessonsI {
  lessons: LessonI[];
  total: number;
  totalPages: number;
}

export interface RequestI {
  id: string;
  created_at: string;
  unit_title: string;
  status: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
}

export interface RequestsI {
  requests: RequestI[];
  total: number;
  totalPages: number;
}

export interface QuestionI {
  id: string;
  type: string;
  is_quiz: boolean;
  difficulty: number;
}

export interface QuestionsI {
  questions: QuestionI[];
  total: number;
  totalPages: number;
}

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery,
  endpoints: (builder) => ({
    getCourses: builder.query<CoursesI, { page: number }>({
      query: ({ page }) => {
        return {
          url: `course/getAll?page=${page}`,
        };
      },
    }),
    addCourse: builder.mutation({
      query: ({ data }) => {
        return {
          url: `course/add`,
          method: "POST",
          body: data,
        };
      },
    }),
    editCourse: builder.mutation({
      query: ({ data, courseId }) => {
        return {
          url: `course/update/${courseId}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => {
        return {
          url: `course/delete/${courseId}`,
          method: "DELETE",
        };
      },
    }),
    getUnits: builder.query<UnitsI, { page: number; courseId: string }>({
      query: ({ page, courseId }) => {
        return {
          url: `unit/course/${courseId}?page=${page}`,
        };
      },
    }),
    addUnit: builder.mutation({
      query: ({ data }) => {
        return {
          url: `unit/add`,
          method: "POST",
          body: data,
        };
      },
    }),
    editUnit: builder.mutation({
      query: ({ data, unitId }) => {
        return {
          url: `unit/update/${unitId}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    deleteUnit: builder.mutation({
      query: (unitId) => {
        return {
          url: `unit/delete/${unitId}`,
          method: "DELETE",
        };
      },
    }),
    getLesson: builder.query<{ lesson: LessonI }, { lessonId: string }>({
      query: ({ lessonId }) => {
        return {
          url: `file/getLesson/${lessonId}`,
        };
      },
    }),
    getLessons: builder.query<LessonsI, { page: number; unitId: string }>({
      query: ({ page, unitId }) => {
        return {
          url: `file/getLessons/unit/${unitId}?page=${page}`,
        };
      },
    }),
    addLesson: builder.mutation({
      query: ({ data }) => {
        return {
          url: `file/addLesson`,
          method: "POST",
          body: data,
        };
      },
    }),
    editLesson: builder.mutation({
      query: ({ data, lessonId }) => {
        return {
          url: `file/updateLesson/${lessonId}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    deleteLesson: builder.mutation({
      query: (lessonId) => {
        return {
          url: `file/deleteLesson/${lessonId}`,
          method: "DELETE",
        };
      },
    }),
    getRequests: builder.query<RequestsI, { page: number }>({
      query: ({ page }) => {
        const accessToken = Cookies.get("access_token");
        return {
          url: `unit/getCompleted?page=${page}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    addQuestion: builder.mutation({
      query: ({ data }) => {
        return {
          url: `question/add`,
          method: "POST",
          body: data,
        };
      },
    }),
    getQuestions: builder.query<QuestionsI, { page: number; lessonId: string }>(
      {
        query: ({ page, lessonId }) => {
          return {
            url: `question/lesson/${lessonId}?page=${page}`,
          };
        },
      }
    ),
    deleteQuestion: builder.mutation({
      query: (questionId) => {
        return {
          url: `question/delete/${questionId}`,
          method: "DELETE",
        };
      },
    }),
    getFiles: builder.mutation<FilesI, { fileName: string }>({
      query: ({ fileName }) => {
        return {
          url: `file/getFiles`,
          method: "POST",
          body: { fileName },
        };
      },
    }),
  }),
});

export const {
  useGetUnitsQuery,
  useGetLessonQuery,
  useGetLessonsQuery,
  useGetCoursesQuery,
  useAddUnitMutation,
  useGetFilesMutation,
  useEditUnitMutation,
  useGetRequestsQuery,
  useAddCourseMutation,
  useGetQuestionsQuery,
  useAddLessonMutation,
  useDeleteUnitMutation,
  useEditCourseMutation,
  useEditLessonMutation,
  useAddQuestionMutation,
  useDeleteCourseMutation,
  useDeleteLessonMutation,
  useDeleteQuestionMutation,
} = courseApi;
