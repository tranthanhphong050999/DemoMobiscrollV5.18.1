import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map'
import { Post } from "../../model/post"
import { Observable } from 'rxjs/Observable'

@Injectable()
export class PostServiceProvider {
    
    constructor(public http: HttpClient) {
    }

    findPosts() : Observable<Post[]> {
        let headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
        let options = { headers }
        return this.http.get(`/posts`, options)
        .map(res => <Post[]> res)
    }

    findPostsTitle(title : string): Observable<Post[]> {
        let headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
        let options = { headers }
        return this.http.get(`/posts/title_like=`+title,options)
            .map(res => <Post[]> res)
    }

    findPostsId(id: string) : Observable<Post> {
        let headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})
        let options = { headers }
        return this.http.get(`/posts?id=${id}`,options)
            .map(res => {
                let posts = <Post[]> res
                return posts.length > 0 ? posts[0] : null
            })
    }

    findPostsInRange(start: number, limit: number) {
        let options = {headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})}
        return this.http.get<Post[]>(`posts?_start=${start}&_limit=${limit}`,options)
    }

    deletePosts(id: string) {
        let options = {headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})}
        return this.http.delete(`posts/${id}`,options)
    }

    updatePosts(post: Post) {
        let options = {headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})}
        return this.http.put(`/posts/${post.id}`,post,options)
    }

    createPosts(post: Post) : Observable<Post> {
        let options = {headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})}
        return this.http.post(`/posts`,post,options)
    }
}