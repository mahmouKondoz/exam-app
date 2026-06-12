export interface DiplomasType{

    id:string ,
    title:string ,
    description:string ,
    image:string ,
    createdAt:string ,
    updatedAt:string,
   
}


interface ApiResponse  {
  status: boolean;
  code: number;
  payload: {
    data: DiplomasType[];
  };
};

export interface Props {
  dataPromise: Promise<ApiResponse>;
};