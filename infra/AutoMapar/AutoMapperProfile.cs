

namespace infra.AutoMapar
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
          //   CreateMap<MedCenterType, MedCenterTypeViewModel>().ForMember(
          //        dest => dest.MedCenterTypesId,
          //      opt => opt.MapFrom(src => src.Id)
          //       ).ReverseMap().ForMember(dest => dest.Id,
          //      opt => opt.MapFrom(src => src.MedCenterTypesId));

          //   CreateMap<MedicalCenter, MedicalCenterViewModel>()
          //   .ForMember(x => x.MedicalCenterId, o => o.MapFrom(s => s.Id))
          //   .ForMember(x => x.usercount, o => o.MapFrom(s => s.UsersMeds.Count)).ReverseMap();
          //   CreateMap<Clinic, MedicalCenterViewModel>().ForMember(x => x.usercount, o => o.MapFrom(s => s.usersClinics.Count)).ReverseMap(); ;
          //   CreateMap<Clinic, ClinicViewModel>().ForMember(x => x.MedicalCenter, o => o.MapFrom(s => s.medicalCenter))
          //   .ForMember(x => x.MedicalCenterId, o => o.MapFrom(s => s.medicalCenter.Id))
          //   .ForMember(x => x.usercount, o => o.MapFrom(s => s.usersClinics.Count)).ReverseMap();

          //   CreateMap<Directorate, DirectorateViewModels>().ReverseMap();
          //   // CreateMap<Beds, BedsViewModels>().ForMember(x => x.medicalCentername, o => o.MapFrom(s => s.medicalCenter.Name)).ReverseMap();
          //   CreateMap<MedicalCenter, ShortMedicalCenterViewModel>().ForMember(x => x.MedicalCenterId, o => o.MapFrom(s => s.Id)).ReverseMap();
          //   CreateMap<Clinic, ClinViewModel>().ReverseMap();
          //   //CreateMap<SubIndicators, SubIndicatorsDto>().ReverseMap();

          //   //CreateMap<MedEsrMainIndDto, MedEsrMainInd>().ReverseMap();
          //   //CreateMap<MedEsrIndDto, MedEsrInd>().ReverseMap();
          //   //CreateMap<MedEsrSupIndDto, MedEsrSupInd>().ReverseMap();
          //   CreateMap<Call937, Call937Dto>()
          //   .ForMember(x => x.medicalCenter, o => o.MapFrom(s => s.medicalCenter.Name))
          //   .ForMember(x => x.ComplainType, o => o.MapFrom(s => s.ComplainTypeN))
          //   .ForMember(x => x.clinic, o => o.MapFrom(s => s.clinic.Name))
          //   .ForMember(x => x.typeOfComplain, o => o.MapFrom(s => s.typeOfComplain.Name))
          //   ;
          //   CreateMap<ArshCall937, Call937Dto>()
          //   .ForMember(x => x.ComplainType, o => o.MapFrom(s => s.archComplainType))
          // //   .ForMember(x => x.medicalCenter, o => o.MapFrom(s => s.medicalCenter))
          // //   .ForMember(x => x.clinic, o => o.MapFrom(s => s.clinic))
          // //   .ForMember(x => x.typeOfComplain, o => o.MapFrom(s => s.typeOfComplain))
          // ;
          //   CreateMap<Call937, Call937ViewModel>()
          //        .ForMember(x => x.medicalCenter, o => o.MapFrom(s => s.medicalCenter.Name))
          //        .ForMember(x => x.clinic, o => o.MapFrom(s => s.clinic.Name))
          //       .ReverseMap();
        }
    }
}
