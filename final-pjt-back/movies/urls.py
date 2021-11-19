from django.urls import path
from . import views

urlpatterns = [
    path('movies/popularity/', views.read_movies_by_popularity),
    path('movies/score/', views.read_movies_by_score),
    path('movies/release_date/', views.read_movies_by_release),
    path('movies/recommend/', views.read_movies_by_recommend),
    path('movies/<int:movie_pk>/reviews/', views.review_list),
    path('movies/score/update/<int:movie_pk>/', views.update_score),
    path('movies/wanted/update/<int:movie_pk>/', views.update_wanted),
    path('reviews/<int:review_pk>/', views.review_detail),
    path('reviews/<int:review_pk>/likes/', views.likes),
    path('reviews/<int:review_pk>/dislikes/', views.dislikes),
    path('reviews/<int:review_pk>/comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('people/actors/', views.actor_list),
    path('people/actors/<int:actor_pk>/', views.actor_detail),
    path('people/directors/',views.director_list),
    path('people/directors/<int:director_pk>/',views.director_detail),


    path('database/genres/', views.get_genre),
    path('database/movies/', views.get_movies),
    path('database/credits/', views.get_credits)
]
