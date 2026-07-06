using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Domain.Entities;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain;
using Libres.API.Shared.Domain.Enums;

namespace Libres.API.Features.Books.Domain
{
    public class Book : AggregateRoot
    {
        public string Title { get; private set; } = string.Empty;
        public string? Description { get; private set; }
        public DateTime CreatedAt { get; private set; }
        // public User? Author { get; set; }
        public Guid UserId { get; set; }
        public decimal Price { get; set; } = 0;

        public int Order { get; private set; } = 0;
        public string? CoverImagePath { get; private set; }
        public string? FilePath { get; private set; }

        private List<Review> _reviews = new List<Review>();
        public IReadOnlyCollection<Review> Reviews => _reviews.AsReadOnly();

        public Guid? CategoryId { get; private set; }

        public BookStatus BookStatus { get; private set; } = BookStatus.Pending;







        public Book() : base(Guid.Empty)
        {
        }

        public Book(Guid id, string title, Guid userId, Guid? categoryId,
                    decimal price,
                    string? description, string? coverImagePath, string? filePath) : base(id)
        {
            Title = title;
            Description = description;
            UserId = userId;
            CategoryId = categoryId;
            CreatedAt = DateTime.UtcNow;
            CoverImagePath = coverImagePath;
            Price = price;
            FilePath = filePath;
        }

        public static Result<Book> Create(string title, Guid userId, Guid? categoryId,
                                        decimal price,
                                          string? description, string? coverImagePath, string? filePath)
        {
            var book = new Book(Guid.NewGuid(), title, userId, categoryId, price, description, coverImagePath, filePath);
            return Result<Book>.Success(book);
        }


        public void UpdateStatus(BookStatus status)
        {
            this.BookStatus = status;
        }

        public Result<bool> ChangeName(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName))
            {
                return Result<bool>.Failure("New Name Cannot be empty");
            }
            this.Title = newName;
            return Result<bool>.Success(true);
        }
        public Result<bool> ChangeDescription(string? newDescription)
        {
            this.Description = newDescription;

            return Result<bool>.Success(true);
        }


        public void AddReview(Review review)
        {
            this._reviews.Add(review);

        }
        public void RemoveReview(Review review)
        {
            this._reviews.Remove(review);

        }

        public double AverageRate => _reviews.Any() ? _reviews.Average(r => r.Rating) : 0.0;
    }
}