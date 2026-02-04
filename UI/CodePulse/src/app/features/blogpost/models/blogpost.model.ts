import { Category } from "../../category/models/category.model";

export interface AddBlogPostRequest{
    title : string,
    shortDescription : string,
    content : string,
    featuredImageUrl : string,
    urlHandle : string,
    author : string,
    publishedDate : Date,
    isVisible : boolean,
    categories : string[];
}
//these dtos are very lightweight we should have a seprate dto
//for every request and response though they look same
export interface UpdateBlogPostRequest{
    title : string,
    shortDescription : string,
    content : string,
    featuredImageUrl : string,
    urlHandle : string,
    author : string,
    publishedDate : Date,
    isVisible : boolean,
    categories : string[];
}
export interface BlogPost{
    id : string,
    title : string,
    shortDescription : string,
    content : string,
    featuredImageUrl : string,
    urlHandle : string,
    author : string,
    publishedDate : string,
    isVisible : boolean,
    categories : Category[]
}
