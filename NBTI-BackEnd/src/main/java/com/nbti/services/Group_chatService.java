package com.nbti.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nbti.dao.ChatDAO;
import com.nbti.dao.Group_chatDAO;
import com.nbti.dao.Group_memberDAO;
import com.nbti.dao.MembersDAO;
import com.nbti.dto.ChatDTO;
import com.nbti.dto.Group_chatDTO;
import com.nbti.dto.Group_chatSizeDTO;
import com.nbti.dto.Group_memberDTO;

@Service
public class Group_chatService {

	@Autowired
	private Group_chatDAO dao;

	@Autowired
	private Group_memberDAO mdao;

	@Autowired
	private ChatDAO cdao;

	@Autowired
	private MembersDAO msdao;

	@Transactional
	public void insert(String member_id, String loginID) throws Exception {
		List<String> list = new ArrayList<>();
		list.add(member_id);
		list.add(loginID);
		boolean check = mdao.check(list);
		list = msdao.chatMembersName(list);

		if (!check) {
			
			List<Group_memberDTO> member_list = new ArrayList<>();
			String name1 = "";
			String name2 = "";
			System.out.println(member_id);
			if (loginID.equals(member_id)) {
				int group_seq = dao.insert("N");
				Group_memberDTO dto = new Group_memberDTO(group_seq, member_id, 0, "Y", "N", "나와의 채팅");
				member_list.add(dto);
			} else {
				if (list.get(0).equals(member_id)) {
					name2 = list.get(0);
					name1 = list.get(1);
				} else {
					name2 = list.get(1);
					name1 = list.get(0);
				}
				int group_seq = dao.insert("Y");
				Group_memberDTO dto = new Group_memberDTO(group_seq, member_id, 0, "Y", "N", name1);
				member_list.add(dto);
				dto = new Group_memberDTO(group_seq, loginID, 0, "Y", "N", name2);
				member_list.add(dto);
				ChatDTO cdto = new ChatDTO(0, "system", name1 + "님과 " + name2 + "님이 입장하셨습니다!", null, group_seq, 0);
				cdao.insert(cdto);
			}
			mdao.insert(member_list);

		}

	}
	
	public String getInvite(int group_seq) throws Exception{
		return dao.getInvite(group_seq);
	}

	public List<Group_chatDTO> getList(List<Group_memberDTO> list) throws Exception {
		return dao.getList(list);
	}

	public void delete(int seq) throws Exception {
		dao.delete(seq);
	}

	public List<Group_chatSizeDTO> getChatSizeDTOs(String loginID) throws Exception {
		List<Group_memberDTO> list = new ArrayList<>();
		List<Group_chatSizeDTO> result = new ArrayList<>();
		list = mdao.list(loginID);// 그멤버가 가지고있는 group_seq 뽑기
		List<Group_chatDTO> chatList = dao.getList(list); // group_chat 목록 뽑기 seq에 맞게..사실 지금은 필없지만 나중에 group_chat에 컬럼
															// 생기면 유용함

		if (chatList == null) {
			return null;
		}

		for (int i = 0; i < chatList.size(); i++) {
			int size = 0;
			Group_chatDTO dto = chatList.get(i);
			for (Group_memberDTO MemberDTO : list) {
				if (MemberDTO.getGroup_seq() == dto.getSeq()) {
					List<Group_memberDTO> memberList = mdao.members(MemberDTO.getGroup_seq()); // seq에맞는 멤버 목록
					size = memberList.size();
					int last_chat_seq = 0;
					for (Group_memberDTO member : memberList) {
						if (member.getMember_id().equals(loginID)) {
							last_chat_seq = member.getLast_chat_seq();

							break;
						}
					}
					ChatDTO cdto = cdao.getLastDTO(dto.getSeq()); // 그룹채팅방에서 마지막 메세지 가저오는거고
					int unread = 0;
					if (cdto != null) {
						unread = cdao.unread(dto.getSeq(), last_chat_seq, cdto.getSeq()) - 1;
					}
					result.add(new Group_chatSizeDTO(dto.getSeq(), MemberDTO.getName(), MemberDTO.getAlarm(),
							MemberDTO.getBookmark(), size, unread, cdto));
					break;
				}
			}
		}

		if (list != null)
			return result;

		return null;

	}

}
