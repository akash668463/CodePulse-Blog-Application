using Microsoft.AspNetCore.Identity;

namespace CodePulse.API.Repositories.Interface
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user, IList<string> roles);
    }
}
