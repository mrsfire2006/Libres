using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain;

namespace Libres.API.Features.UserLibrary.Domain
{
    public class Library : AggregateRoot
    {

        public Guid UserId { get; private set; }
        public Guid BookId { get; private set; }
        public DateTime GrantedAt { get; private set; }
        public bool IsBlocked { get; private set; }
        public Library() : base(Guid.Empty)
        {
        }
        private Library(Guid id, Guid userId, Guid bookId) : base(id)
        {
            UserId = userId;
            BookId = bookId;
            GrantedAt = DateTime.UtcNow;
            IsBlocked = false;
        }

        public static Result<Library> Create(Guid userId, Guid bookId)
        {
            return Result<Library>.Success(new Library(Guid.NewGuid(), userId, bookId));
        }


        public void BlockAccess()
        {
            IsBlocked = true;
        }
    }
}